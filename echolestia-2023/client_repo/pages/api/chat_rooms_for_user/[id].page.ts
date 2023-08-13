import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { BACKEND_URL } from "@/components/api";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const {
      query: { id },
    } = req;
    try {
      const response = await axios.get(
        `${BACKEND_URL}/chat_rooms?ai=false&user=${id}`,
        {
          headers: {
            Authorization: req.headers.authorization,
            accept: "application/json",
          },
        }
      );

      const data = response.data;

      return res.status(200).json(data);
    } catch (error) {

      return res.status(500).json({ error: error });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;
