import { createProxyMiddleware } from "http-proxy-middleware";
import { NextApiRequest, NextApiResponse } from "next";
import { BACKEND_URL } from "@/config/api";

const APIProxyOptions = {
  target: BACKEND_URL,
  changeOrigin: true,
  pathRewrite: {
    "^/api/": "/", // this will remove '/api' from the request path
  },
  on: {
    proxyReq: (proxyrequest: any, req: NextApiRequest) => {
      if (req.headers.authorization) {
        proxyrequest.setHeader("Authorization", req.headers.authorization);
      }
      // if (req.headers.accept) {
      //   proxyrequest.setHeader("accept", req.headers.accept);
      // }
      // if (req.headers["Content-Type"]) {
      //   proxyrequest.setHeader("Content-Type", req.headers["Content-Type"]);
      // }
      // proxyrequest.setHeader("Referrer-Policy", "no-referrer");
    },
    proxyRes: (proxyRes: any, req: NextApiRequest, res: NextApiResponse) => {
      proxyRes.setHeader(
        "Access-Control-Allow-Origin",
        "http://localhost:3000"
      );
      proxyRes.on("end", function () {
        res.end(); // ensures the response is ended
      });
    },
    /**
     * On Connection Error or Proxy Conn Error
     */
    error: (err: Error, req: NextApiRequest, res: NextApiResponse) => {
      res.status(500).json({ message: "Something went wrong.", error: err });
    },
  },
  secure: false,
};

export const config = {
  api: {
    /**
     * The byte limit of the body. This is the number of bytes or any string
     * format supported by `bytes`, for example `1000`, `'500kb'` or `'3mb'`.
     *
     * We set NO Imposed Limit to Allow POST Request Through
     */
    bodyParser: false,
    /**
     * Flag to disable warning "API page resolved
     * without sending a response", due to explicitly
     * using an external API resolver, like express
     */
    externalResolver: true,
  },
};

const proxyMiddleware: any = createProxyMiddleware(APIProxyOptions as any);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve, reject) => {
    proxyMiddleware(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
