import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export const data = require('../dummyJSON/chat.json');

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  // const filePath = path.resolve('./', 'dummyJSON', 'chat.json');
  // const filePath = path.join(
  //   process.cwd(),
  //   'src/pages/api/dummyJSON/chat.json'
  // );
  // const fileContents = fs.readFileSync(filePath, 'utf8');
  // const data = JSON.parse(fileContents);

  res.status(200).json(data);
};

export default handler;
