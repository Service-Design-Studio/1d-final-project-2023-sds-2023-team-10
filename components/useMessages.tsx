import { useEffect, useState } from "react";
import useUser from "./useUser";
import { Message } from "../types";

const useMessages = (chatroomId: number) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [user, token, loading] = useUser();

  useEffect(() => {
    if (!token) {
      return undefined; // Ensuring consistent return with a "no operation" function
    }

    const cable = new WebSocket(
      `ws://34.124.128.83:3000//cable?token=${token}`
    );

    cable.onopen = () => {
      cable.send(
        JSON.stringify({
          command: "subscribe",
          identifier: JSON.stringify({
            channel: "MessageChannel",
            chat_room_id: chatroomId,
          }),
        })
      );
    };

    cable.onmessage = (event) => {
      const serverResponse = JSON.parse(event.data);

      if (
        serverResponse?.message &&
        serverResponse.message?.type === "message"
      ) {
        const { message } = serverResponse.message;
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    cable.onerror = (error) => {
      console.error("WebSocket error", error);
    };

    return () => {
      if (cable) {
        cable.close();
      }
    };
  }, [token, chatroomId]); // Include chatroomId as a dependency to ensure the effect runs when it changes

  return messages;
};

export default useMessages;
