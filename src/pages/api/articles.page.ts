import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export const data = require("../dummyJSON/users.json");

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    // const filePath = path.resolve('./', 'dummyJSON', 'chat.json');
    // const filePath = path.join(
    //   process.cwd(),
    //   'src/pages/api/dummyJSON/chat.json'
    // );
    // const fileContents = fs.readFileSync(filePath, 'utf8');
    // const data = JSON.parse(fileContents);

    const result = await fetch(
      "https://rubybackend-rgegurmvca-as.a.run.app/articles",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      }
    );

    const data = await result.json();

    console.log(data);

    res.status(200).json(data);
  } else {
    // const filePath = path.resolve('../', 'dummyJSON', 'users.json');
    // const fileContents = fs.readFileSync(filePath, 'utf8');
    // const data = JSON.parse(fileContents);

    const result = await fetch(
      "https://rubybackend-rgegurmvca-as.a.run.app/articles",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await result.json();

    console.log(data);

    res.status(200).json(data);
  }
};

export default handler;
