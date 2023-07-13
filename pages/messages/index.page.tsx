import AppLayout from "@/components/AppLayout";
import React, { useEffect, useState } from "react";
import MessagePanel from "./components/MessagePanel";
import ContactPanel from "./components/ContactPanel";
import { ChatRoom, User } from "@/types";
import axios from "../axiosFrontend";
import { Box, Spinner } from "@chakra-ui/react";
import { APIGetUserInformation } from "@/components/api";
export const ADMIN_USER_ID = 1;
export const DEFAULT_USER_ID = 1;

function Messages() {
  const [loading, setLoading] = useState(true);
  const [chatrooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<number>();
  const [chatUsers, setChatUsers] = useState<User[]>([]);

  const fetchChatRooms = async () => {
    try {
      const response = await axios.get(
        `/api/chat_rooms_for_user/${DEFAULT_USER_ID}`
      );

      setTimeout(() => {
        setChatRooms(response.data);
        // fetchChatUsers(response.data);
        setLoading(false);
      }, 20);
    } catch (error) {
      console.log(error);
    }
  };

  // const fetchChatUsers = async (chatrooms: ChatRoom[]) => {
  //   chatrooms.forEach((chatroom) => {
  //     const opponentUserId =
  //       chatroom.user1_id === DEFAULT_USER_ID
  //         ? chatroom.user2_id
  //         : chatroom.user1_id;

  //     const chatUsers = axios.get(`/api/users/${opponentUserId}`, {
  //       headers: {
  //         accept: "application/json",
  //       },
  //     });
  //   });
  // };

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
        <Box className="animate-slideIn">
          <MessagePanel
            selectedChatId={selectedChatId}
            setSelectedChatId={setSelectedChatId} // set to undefined when the user presses back
            fetchChatRooms={fetchChatRooms} // passed down so that we can update chatrooms when the user presses back
          />
        </Box>
      </AppLayout>
    );
  } else {
    return (
      <AppLayout>
        <ContactPanel
          chatrooms={chatrooms}
          // chatUsers={chatUsers}
          selectedChatId={selectedChatId} // set when the user clicks on a chat
          setSelectedChatId={setSelectedChatId} // set when the user clicks on a chat
        />
      </AppLayout>
    );
  }
}

export default Messages;
