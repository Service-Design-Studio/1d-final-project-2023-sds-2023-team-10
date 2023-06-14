import { NextApiRequest, NextApiResponse } from "next";
import { getUserHighlights } from "./getUserHighlights.page";
import path from "path";

const filePath = path.join(
  process.cwd(),
  "pages/api",
  "dummyJSON",
  "userHighlights.json"
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.query.userId as string;
  const blogId = req.query.blogId as string;

  if (typeof userId === "string" && typeof blogId === "string") {
    const highlights = await getUserHighlights(userId, filePath);
    console.log(highlights);
    const highlight = highlights?.find((h) => h.highlight.id === blogId);

    if (highlight) {
      res.status(200).json(highlight);
    } else {
      res.status(404).json({ message: "Highlight not found" });
    }
  } else {
    res.status(400).json({ message: "Invalid userId or blogId" });
  }
}
