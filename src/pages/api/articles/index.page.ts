import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { AxiosResponse } from "axios";
import axios from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const result = await axios.post(
      "https://rubybackend-xnabw36hha-as.a.run.app/articles",
      JSON.stringify(req.body),
      {
        headers: {
          Authorization: req.headers.authorization,
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const data = await result.data;
    return res.status(200).json(data);
  }

  if (req.method === "GET") {
    console.log("backend received", req.headers);
    const result = await axios.get(
      "https://rubybackend-xnabw36hha-as.a.run.app/articles",
      {
        headers: {
          Authorization: req.headers.authorization,
          accept: "application/json",
        },
      }
    );

    const data = await result.data;
    return res.status(200).json(data);
  }
};

export default handler;
