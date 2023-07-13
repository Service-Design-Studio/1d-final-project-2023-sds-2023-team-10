import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export const baseUrl = "https://rubybackend-xnabw36hha-as.a.run.app";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      console.log(req.body);
      const result = await axios.post(
        `${baseUrl}/messages`,
        JSON.stringify(req.body),
        {
          headers: {
            Authorization: req.headers.authorization,
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      return res.status(200).json(result.data);
    } catch (error) {
      //   console.error(error);
      return res.status(500).json({ error: error });
    }
  } else {
    // Handle any other HTTP methods
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
