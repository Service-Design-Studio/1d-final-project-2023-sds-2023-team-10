// pages/api/signup.ts

import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { BACKEND_URL } from "@/config/api";

export const baseUrl = "http://34.124.128.83:3000";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const result = await axios.get(`${baseUrl}/articles`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo3NywiZXhwIjoxNjkwMjkwNjYwfQ.y9FQ3_vSCAbxSJVmRvvlOjws6Oo4L4lG63Z5k5XggR4",
        },
      });

      res.json(result.data);
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
