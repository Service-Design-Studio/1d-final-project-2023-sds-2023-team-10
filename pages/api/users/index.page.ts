import { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosResponse } from "axios";
import { BACKEND_URL } from "@/components/api";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    console.log("backend received", req.body);

    const result = await axios.post(
      `${BACKEND_URL}/users`,
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
      `${BACKEND_URL}/users`,
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

export function APIGetArticles(): Promise<AxiosResponse<any>> {
  return axios.get(`${BACKEND_URL}/users`, {
    headers: {
      accept: "application/json",
    },
  });
}

export default handler;
