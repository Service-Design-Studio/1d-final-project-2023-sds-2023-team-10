import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

export const baseUrl = 'https://rubybackend-rgegurmvca-as.a.run.app';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        const result = await axios.get(
            baseUrl + "/users",
            {
                headers: {
                    accept: "application/json",
                }
            }
        )

        const userData = await result.data;
        return res.status(200).json(userData);
    }
};

export default handler;
