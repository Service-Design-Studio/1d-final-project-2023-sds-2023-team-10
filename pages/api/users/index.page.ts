import { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosResponse } from "axios";
import { BACKEND_URL } from "@/components/api";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {


    try {
      const result = await axios.post(
        `${BACKEND_URL}/users`,
        JSON.stringify(req.body),
        {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.RUBY_SIGNUP_TOKEN}`,
          },
        }
      );

      console.log("trying to signup")

      const data = await result.data;
      console.log("signup successful", data)
      return res.status(200).json(data);
    } catch (error) {
      console.log("failed to signup");
      return res.status(error.response.status).json({ error: error });
    }
  }

  if (req.method === "GET") {
    const result = await axios.get(
      `${BACKEND_URL}/users?admin=true`,
      {
        headers: {
          Authorization: req.headers.authorization,
          accept: "application/json",
        },
      }
    );

    const data = await result.data;
    return res.status(200).json(data);
  }
};

export function APIGetArticles(): Promise<AxiosResponse<any>> {
  return axios.get(`${BACKEND_URL}/users`, {
    headers: {
      accept: "application/json",
    },
  });
}

export default handler;
