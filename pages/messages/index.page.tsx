import AppLayout from "@/components/AppLayout";
import React, { useEffect, useState } from "react";
import MessagePanel from "./components/MessagePanel";
import ContactPanel from "./components/ContactPanel";
import { ChatRoom } from "@/types";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";
export const ADMIN_USER_ID = 1;
export const DEFAULT_USER_ID = 2;

function Messages() {
  const [loading, setLoading] = useState(true);
  const [chatrooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<number>();
  const [chatRoomData, setChatRoomData] = useState<any>({}); // this also have message inside
  const [loadingChatRoomData, setLoadingChatRoomData] = useState(false);

  const fetchChatRooms = async () => {
    try {
      const response = await axios.get(
        `/api/chat_rooms_for_user/${DEFAULT_USER_ID}`
      );

      console.log(response);
      setTimeout(() => {
        setChatRooms(response.data);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChatRooms();
  }, []);
  useEffect(() => {
    console.log("change in selectedChatId", selectedChatId);
  }, [selectedChatId]);

  if (loading) {
    return (
      <AppLayout>
        <div className="flex h-screen w-full items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <Spinner size="large" />
            <h1 className="text-4xl">Loading your chats...</h1>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (selectedChatId) {
    return (
      <AppLayout>
        <MessagePanel selectedChatId={selectedChatId} />
      </AppLayout>
    );
  } else {
    return (
      <AppLayout>
        <ContactPanel
          chatrooms={chatrooms}
          selectedChatId={selectedChatId}
          setSelectedChatId={setSelectedChatId}
        />
      </AppLayout>
    );
  }
}

export default Messages;
