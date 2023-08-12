import { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosResponse } from "axios";
import { BACKEND_URL } from "@/components/api";
import { ChatRoomBeforeSend, Message, MessageBeforeSend } from "@/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        try {
            const response = await axios.post(
                `${BACKEND_URL}/chat_rooms`,
                JSON.stringify(req.body),
                {
                    headers: {
                        Authorization: req.headers.authorization,
                        accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    params: req.query,
                }
            );


            const data = await response.data;
            return res.status(200).json(data);
        } catch (error) {
            console.log("error in api/chat_rooms/index.page.ts: post");
            return res.status(error.response.status).json({ error: error });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
};

export default handler;

export const APICreateChatRoom = async (
    chatroom: ChatRoomBeforeSend
): Promise<AxiosResponse<any> | null> => {
    try {
        const response = await axios.post("/api/messages", chatroom, {
            headers: {
                Accept: "application/json",
            },
        });

        return response;
    } catch (error) {

        return null;
    }
};
