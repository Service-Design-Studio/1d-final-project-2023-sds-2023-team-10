import { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosResponse } from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {


    const result = await axios.post(
      "https://rubybackend-xnabw36hha-as.a.run.app/users",
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
      "https://rubybackend-xnabw36hha-as.a.run.app/users",
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
  return axios.get("https://rubybackend-xnabw36hha-as.a.run.app/users", {
    headers: {
      accept: "application/json",
    },
  });
}

export default handler;
