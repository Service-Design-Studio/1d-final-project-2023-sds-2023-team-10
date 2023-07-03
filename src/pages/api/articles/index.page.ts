import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import axios, { AxiosResponse } from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    // const filePath = path.resolve('./', 'dummyJSON', 'chat.json');
    // const filePath = path.join(
    //   process.cwd(),
    //   'src/pages/api/dummyJSON/chat.json'
    // );
    // const fileContents = fs.readFileSync(filePath, 'utf8');
    // const data = JSON.parse(fileContents);

    // const result = await fetch(
    //   "https://rubybackend-xnabw36hha-as.a.run.app/articles",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(req.body),
    //   }
    // );
    console.log("backend received", req.body);

    const result = await axios.post(
      "https://rubybackend-xnabw36hha-as.a.run.app/articles",
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
      "https://rubybackend-xnabw36hha-as.a.run.app/articles",
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
  return axios.get("https://rubybackend-xnabw36hha-as.a.run.app/articles", {
    headers: {
      accept: "application/json",
    },
  });
}

export default handler;
