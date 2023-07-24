/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { BACKEND_URL } from "@/config/api";

export const baseUrl = BACKEND_URL;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { user_id } = req.query;

    try {
      const result = await axios.get(
        `${baseUrl}/chat_rooms_for_user/${user_id}`,
        {
          headers: {
            Authorization: req.headers.authorization,
            accept: "application/json",
          },
        }
      );
      return res.status(200).json(result.data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  } else {
    // Handle any other HTTP methods
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  return res.status(404);
};

export default handler;
