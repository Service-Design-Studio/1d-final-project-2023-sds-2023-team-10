import { NextApiRequest, NextApiResponse } from "next";

import { APIGetUserInformation, BACKEND_URL } from "@/components/api";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  // if (req.method === "GET") {
  //   const user = await APIGetUserInformation(id as string);
  //   return res.status(200).json(user.data);
  // }

  if (req.method === "GET") {
    const result = await axios.get(
      `${BACKEND_URL}/users/${id}`,
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
}
