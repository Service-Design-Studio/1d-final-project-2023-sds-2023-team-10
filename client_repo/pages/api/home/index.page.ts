import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import axios, { AxiosResponse } from "axios";
import { APIGetAllArticles, BACKEND_URL } from "@/components/api";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // if (req.method === "POST") {
  //   console.log("backend received", req.body);

  //   const result = await axios.post(
  //     BACKEND_URL + "articles",
  //     JSON.stringify(req.body),
  //     {
  //       headers: {
  //         accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );

  //   const data = await result.data;
  //   return res.status(200).json(data);
  // }

  // if (req.method === "GET") {
  //   const data = (await APIGetAllArticles()).data;
  //   return res.status(200).json(data);
  // }

  if (req.method === "GET") {
    const result = await axios.get(`${BACKEND_URL}/articles`, {
      headers: {
        Authorization: req.headers.authorization,
        accept: "application/json",
      },
    });

    const data = await result.data;
    return res.status(200).json(data);
  }
};

export default handler;
