import AppLayout from "@/components/AppLayout";
import React, { useEffect, useState } from "react";
import MessagePanel from "./components/MessagePanel";
import ContactPanel from "./components/ContactPanel";

import { ChatRoom, User } from "@/types";
import axios from "../axiosFrontend";
import { Box, Spinner, Text } from "@chakra-ui/react";
import useUser from "@/components/useUser";
import AddChatButton from "./components/AddChatButton";
import AddChatModal from "./components/AddChatModal";
export const ADMIN_USER_ID = 1;

function Messages() {
  const [loading, setLoading] = useState(true);
  const [chatrooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<number>();
  const [user, isLoadingUser] = useUser();
  const [isAddChatModalOpen, setAddChatModalOpen] = useState(false);

  useEffect(() => {
    console.log("User is set to ", user);
  }, [user]);
  useEffect(() => {
    console.log("Chatrooms is set to ", chatrooms);
  }, [chatrooms]);

  const userId = user?.id;

  const fetchChatRooms = async () => {
    try {
      const response = await axios.get(`/api/chat_rooms_for_user/${userId}`);
      let fetchedChatRooms = response.data;
      setChatRooms(fetchedChatRooms);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchChatRooms();
    }
  }, [userId]);

  const handleAddChat = () => {
    console.log("handleAddChat", isAddChatModalOpen);
    setAddChatModalOpen(true);
  };

  const handleCloseModal = () => {
    setAddChatModalOpen(false);
  };

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
        {loading ? (
          <div className="flex h-screen w-full items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <Spinner size="large" />
              <h1 className="text-4xl">Loading your chats...</h1>
            </div>
          </div>
        ) : (
          <ContactPanel
            chatrooms={chatrooms}
            selectedChatId={selectedChatId}
            setSelectedChatId={setSelectedChatId}
          />
        )}
        <AddChatButton onClick={handleAddChat} />
        <AddChatModal
          isOpen={isAddChatModalOpen}
          onClose={handleCloseModal}
          setSelectedChatId={setSelectedChatId}
        />
      </AppLayout>
    );
  }
}

export default Messages;
