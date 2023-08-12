// pages/api/signup.ts

import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { Configuration, OpenAIApi } from "openai";
import { BACKEND_URL } from "@/config/api";

export const baseUrl = "http://34.124.128.83:3000";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { messages } = req.body;
    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });
    res.send(chatCompletion.data.choices[0].message);
  } else {
    // Handle any other HTTP methods
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  return res.status(404);
};

export default handler;
