// pages/api/login.ts

import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { BACKEND_URL } from "@/config/api";

export const baseUrl = BACKEND_URL;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      const result = await axios.post(`${baseUrl}/login`, {
        email,
        password,
      });

      if (result.status === 200) {
        const { token } = result.data;
        const userId = result.data.user_id;
        return res.status(200).json({ token, userId });
      }

      return res.status(401).json({ error: "Unauthorized" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    // Handle any other HTTP methods
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  return res.status(404);
};

export default handler;
