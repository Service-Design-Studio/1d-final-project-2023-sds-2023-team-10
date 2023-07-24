import { createProxyMiddleware } from "http-proxy-middleware";
import { NextApiRequest, NextApiResponse } from "next";
import { BACKEND_URL } from "@/config/api";

const APIProxyOptions = {
  target: BACKEND_URL,
  changeOrigin: true,
  pathRewrite: {
    "^/api/": "/", // this will remove '/api' from the request path
  },
  onProxyReq: (proxyrequest: any, req: NextApiRequest) => {
    if (req.headers.authorization) {
      proxyrequest.setHeader("Authorization", req.headers.authorization);
    }
  },
  onProxyRes: (proxyRes: any, req: NextApiRequest, res: NextApiResponse) => {
    proxyRes.on("end", function () {
      res.end(); // ensures the response is ended
    });
  },
  /**
   * On Connection Error or Proxy Conn Error
   */
  onError: (err: Error, req: NextApiRequest, res: NextApiResponse) => {
    res.status(500).json({ message: "Something went wrong." });
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
