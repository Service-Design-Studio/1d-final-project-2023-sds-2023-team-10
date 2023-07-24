import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { BACKEND_URL } from "@/config/api";

export const baseUrl = BACKEND_URL;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
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
      return res.status(500).json({ error });
    }
  } else {
    // Handle any other HTTP methods
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
