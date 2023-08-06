import { Flex, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Divider from "./Divider";
import Footer from "./Footer";
import Header from "./Header";
import Messages from "./Messages";
import axios from "../../axiosFrontend";
import { Button, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import ChatBotPanel from "./ChatBotPanel";

import {
  ChatRoomWithMessages,
  Message,
  MessageBeforeSend,
  User,
} from "@/types";
import { sendMessageToAPI } from "@/pages/api/messages/index.page";
import useUser from "@/components/useUser";

export const createNewMessage = (
  sender_id: number,
  receiver_id: number,
  inputMessage: string,
  chatId: number
): MessageBeforeSend => {
  return {
    sender_id: sender_id,
    receiver_id: receiver_id,
    timestamp: new Date().toISOString(),
    sentiment_analysis_score: null,
    content: inputMessage,
    message_type: "string",
    chat_room_id: chatId,
    read: false,
  };
};

type MessagePanelProps = {
  selectedChatId: number;
  setSelectedChatId: (id: number | undefined) => void;
  fetchChatRooms: () => void;
};

const MessagePanel: React.FC<MessagePanelProps> = ({
  selectedChatId,
  setSelectedChatId,
  fetchChatRooms,
}) => {
  const [chatRoom, setChatRoom] = useState<ChatRoomWithMessages>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [opponentUser, setOpponentUser] = useState<User>();
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isChatWithBot, setIsChatWithBot] = useState(false);

  const ToggleButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <Button
      position="fixed"
      top="0"
      right="0"
      zIndex="1000"
      mr="10"
      onClick={() => {
        onClick();
        handleGoToBotChat(); // Call handleGoToBotChat function when ToggleButton is clicked
      }}
    >
      Chat-Bot
    </Button>
  );

  const [user, isLoadingUser] = useUser();
  const userId = user?.id;

  const router = useRouter();

  const handleGoToBotChat = () => {
    setIsChatWithBot(!isChatWithBot);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (selectedChatId) {
        fetchChatRoomsWithMessages();
      }
    }, 1000); // in milliseconds
    return () => clearInterval(intervalId);
  }, [selectedChatId]);
  useEffect(() => {
    if (userId && chatRoom) {
      fetchOpponentUser();
    }
  }, [userId, chatRoom]);

  const fetchChatRoomsWithMessages = async () => {
    try {
      const response = await axios.get(
        `/api/chat_rooms_with_messages/${selectedChatId}`
      );
      setChatRoom(response.data);
      setMessages(response.data.messages);
    } catch (error) {
      console.log(error);
    }
    setLoadingMessages(false);
  };

  const fetchOpponentUser = async () => {
    try {
      const opponentUserId =
        chatRoom?.user1_id === userId ? chatRoom?.user2_id : chatRoom?.user1_id;
      const response = await axios.get(`/api/users/${opponentUserId}`);

      setOpponentUser(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoadingMessages(false);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim().length) {
      return;
    }
    const newMessage = createNewMessage(
      userId!,
      opponentUser!.id,
      inputMessage,
      selectedChatId
    );

    console.log("new message", newMessage);

    sendMessageToAPI(newMessage);

    setMessages((old) => [
      ...old,
      {
        ...newMessage,
        id: old.length + 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
    setInputMessage("");
  };

  const handleBackButtonPressed = () => {
    // change back the selectedChatId to undefined, so that index knows to render contacts panel
    setSelectedChatId(undefined);
    // refresh the chat rooms
    fetchChatRooms();
  };

  if (loadingMessages) {
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <Spinner size="large" />
        <h1 className="text-4xl">Loading your chats...</h1>
      </div>
    </div>;
  }

  return (
    <Flex
      w="100%"
      h="95vh"
      justify="center"
      align="center"
      m="0"
      p="0"
      boxSizing="border-box"
    >
      <ToggleButton onClick={handleGoToBotChat} />

      {/* {isChatWithBot ? (
        <ChatBotPanel
          selectedChatId={selectedChatId}
          handleGoToBotChat={handleGoToBotChat}
        /> // Might need to pass any necessary props.
      ) : ( */}
      <Flex w="100%" h="100%" flexDir="column">
        <Header
          onBackButtonPressed={handleBackButtonPressed}
          opponentUser={opponentUser}
        />
        <Divider />
        <Messages messages={messages} opponentUser={opponentUser} />

        <Divider />
        <Footer
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
        />
      </Flex>
      {/* )} */}
    </Flex>
  );
};

export default MessagePanel;
