import { NextApiRequest, NextApiResponse } from "next";
import firebase from "../../components/firebaseAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Missing "id" query parameter' });
  }

  const doc = await firebase
    .collection("blogs")
    .doc(id as string)
    .get();
  if (!doc.exists) {
    return res.status(404).json({ error: "Blog post not found" });
  }

  return res.status(200).json(doc.data());
}
