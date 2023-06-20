import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export const data = require('../dummyJSON/users.json');

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // const filePath = path.resolve('../', 'dummyJSON', 'users.json');
  // const fileContents = fs.readFileSync(filePath, 'utf8');
  // const data = JSON.parse(fileContents);

  const result = await fetch(
    'https://rubybackend-rgegurmvca-as.a.run.app/articles',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const data = await result.json();

  console.log(data);

  res.status(200).json(data);
};

export default handler;
