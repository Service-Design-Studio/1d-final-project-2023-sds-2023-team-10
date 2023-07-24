import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { BACKEND_URL } from "@/config/api";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const result = await axios.post(
      `${BACKEND_URL}/articles`,
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
  return res.status(404);
};

export default handler;
