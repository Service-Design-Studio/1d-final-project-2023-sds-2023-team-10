import { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosResponse } from 'axios';
import { BACKEND_URL } from "@/components/api";
import { Message, MessageBeforeSend } from "@/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        try {
            const response = await axios.post(
                `${BACKEND_URL}/messages`,
                JSON.stringify(req.body),
                {
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log(response);

            const data = await response.data;
            return res.status(200).json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
}

export default handler;


export const sendMessageToAPI = async (message: MessageBeforeSend): Promise<AxiosResponse<any> | null> => {
    try {
        const response = await axios.post("/api/messages", message, {
            headers: {
                Accept: "application/json",
            },
        });

        console.log(response.data);
        return response;
    } catch (error) {
        console.log('There was an error!', error);
        return null;
    };
}