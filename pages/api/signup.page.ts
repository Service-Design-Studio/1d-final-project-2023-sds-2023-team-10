// pages/api/signup.ts

import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export const baseUrl = "https://rubybackend-xnabw36hha-as.a.run.app";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      const result = await axios.post(`${baseUrl}/users`, {
        email,
        password,
      });

      if (result.status === 200) {
        const token = result.data.token;
        const userId = result.data.user_id;
        const status = result.data.status;
        return res.status(200).json({ status, token, userId, ...result.data });
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
};

export default handler;
