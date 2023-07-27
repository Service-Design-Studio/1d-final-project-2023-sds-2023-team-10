import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

type Blog = {
  id: number;
  title: string;
  content: string;
}

type ResponseData = {
  user: string;
  blogs: Blog[];
}

const filePath = path.join(process.cwd(), "pages/api" ,'dummyJSON', 'userBlogs.json');

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData| {message: string}>
) {
  try {
    //GET user id from request

    const userId = req.query.id as string;

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data: ResponseData = JSON.parse(fileContent);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving user blogs' });
  }
}