import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';
import { BACKEND_URL } from "@/components/api";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        const { user_id } = req.query;

        console.log('user_id', user_id)

        // const response = await axios.get('https://rubybackend-xnabw36hha-as.a.run.app/chat_rooms_for_user/1', {
        try {
            const response = await axios.get(`${BACKEND_URL}/chat_rooms_for_user/${user_id}`, {
                headers: {
                    'accept': 'application/json'
                }
            });

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