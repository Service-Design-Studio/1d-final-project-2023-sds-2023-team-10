import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

type User = {
  username: string;
  email: string;
  userId: string;
};

type Highlight = {
  highlight: any;
  title: string;
  content: string;
  id: string;
  date: string;
};

type UserData = {
  user: User;
  highlight_subcollection: Highlight[];
};

const filePath = path.join(
  process.cwd(),
  "pages/api",
  "dummyJSON",
  "userHighlights.json"
);

export async function getUserHighlights(userId: string, filePath: string) {
  // Read and parse the user data
  const fileContent = await fs.promises.readFile(filePath, "utf-8");
  const data: UserData[] = JSON.parse(fileContent);

  // Find highlights data based on the user ID
  const userData = data.find((record) => record.user.userId === userId);

  return userData?.highlight_subcollection ?? [];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ highlights: Highlight[] } | { message: string }>
) {
  try {
    // Get user ID from request
    const userId = req.query.userId as string;
    console.log(`User ID: ${userId}`);

    // Find highlights data based on the user ID
    const highlights = await getUserHighlights(userId, filePath);
    console.log(highlights);

    if (highlights) {
      res.status(200).json({ highlights: highlights });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving user highlights" });
  }
}
