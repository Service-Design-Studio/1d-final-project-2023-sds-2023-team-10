import { NextApiRequest, NextApiResponse } from "next";

import { APIGetUserInformation } from "@/components/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "GET") {
    const user = await APIGetUserInformation(id as string);
    return res.status(200).json(user.data);
  }
}
