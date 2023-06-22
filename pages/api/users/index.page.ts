import { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosResponse } from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    console.log("backend received", req.body);

    const result = await axios.post(
      "https://rubybackend-rgegurmvca-as.a.run.app/users",
      JSON.stringify(req.body),
      {
        headers: {
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
      "https://rubybackend-rgegurmvca-as.a.run.app/users",
      {
        headers: {
          accept: "application/json",
        },
      }
    );

    const data = await result.data;
    return res.status(200).json(data);
  }
};

export function APIGetArticles(): Promise<AxiosResponse<any>> {
  return axios.get("https://rubybackend-rgegurmvca-as.a.run.app/users", {
    headers: {
      accept: "application/json",
    },
  });
}

export default handler;
