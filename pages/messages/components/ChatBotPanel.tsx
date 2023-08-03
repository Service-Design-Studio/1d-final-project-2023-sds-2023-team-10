import { Flex, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Divider from "./Divider";
import Footer from "./Footer";
import Header from "./Header";
import Messages from "./Messages";
import axios from "../../axiosFrontend";
import { Button, Box } from "@chakra-ui/react";

import {
  ChatRoomWithMessages,
  Message,
  MessageBeforeSend,
  User,
} from "@/types";
import { sendMessageToAPI } from "@/pages/api/messages/index.page";
import useUser from "@/components/useUser";

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

type ChatBotPanelProps = {
  selectedChatId: number;
};

const ChatBotPanel: React.FC<ChatBotPanelProps> = ({ selectedChatId }) => {
  const [chatTitle, setChatTitle] = useState<string>("Chat-Bot");

  const [chatRoom, setChatRoom] = useState<ChatRoomWithMessages>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [opponentUser, setOpponentUser] = useState<User>();
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [inputMessage, setInputMessage] = useState<string>("");

  const [lastChatId, setLastChatId] = useState<number | undefined>(undefined);

  selectedChatId = -1;

  const handleToggle = () => {
    if (selectedChatId !== -1) {
      setLastChatId(selectedChatId);
      setSelectedChatId(-1);
    } else {
      setSelectedChatId(lastChatId);
      setLastChatId(undefined);
    }
  };

  const ToggleButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <Button
      position="fixed"
      top="0"
      right="0"
      zIndex="1000"
      mr="10"
      onClick={onClick}
    >
      Counsellor
    </Button>
  );

  const [user, isLoadingUser] = useUser();
  const userId = user?.id;

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (selectedChatId) {
        fetchChatRoomsWithMessages();
      }
    }, 100000); // in milliseconds
    return () => clearInterval(intervalId);
  }, [selectedChatId]);
  useEffect(() => {
    if (userId && chatRoom) {
      fetchOpponentUser();
    }
  }, [userId, chatRoom]);

  const fetchChatRoomsWithMessages = async () => {
    try {
      const response = await axios.get(`/api/chat_rooms_with_messages/-1`);

      setChatRoom(response.data);
      setMessages(response.data.messages);
    } catch (error) {
      console.log(error);
    }
    setLoadingMessages(false);
  };

  const fetchOpponentUser = async () => {
    try {
      // Instead of getting the id from chatRoom, assign a hardcoded user id of -1
      const opponentUserId = -1;

      // Fetch the user as usual
      const response = await axios.get(`/api/users/${opponentUserId}`);

      setOpponentUser(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoadingMessages(false);
  };

  const createNewMessage = (
    sender_id: number,
    inputMessage: string
  ): MessageBeforeSend => {
    return {
      sender_id: sender_id!,
      receiver_id: -1,
      timestamp: new Date().toISOString(),
      sentiment_analysis_score: null,
      content: inputMessage,
      message_type: "string",
      chat_room_id: selectedChatId,
      read: false,
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim().length) {
      return;
    }

    // User's message
    const newMessage = createNewMessage(userId!, inputMessage);

    // Add the new message to your state
    setMessages((old) => [...old, newMessage]);

    // Clear the input
    setInputMessage("");

    // Get the Chatbot response
    const botResponse = await getChatbotResponse(inputMessage);

    // Create a new message for the bot's response
    const botMessage = createNewMessage(-1, botResponse);

    // Add the new message to your state
    setMessages((old) => [...old, botMessage]);
  };

  // Helper function to send a request to your API which will in turn communicate with GPT-3. You'll need to implement this.
  const getChatbotResponse = async (message) => {
    try {
      const response = await axios.post("/api/chat_room_bot", {
        message:
          "You are a counsellor that talks to people going through unplanned pregnancies (Please give an appropriate response if you feel the message isn't anything related to the scope of assistance you can provide as an unplanned pregnancy counsellor ) : " +
          message,
        // messages: messages,
      });

      console.log(response.data.message);
      // Right here we are assuming the server will respond with a JSON that has the bot response in a property named 'message'
      return response.data.message;
    } catch (error) {
      console.error("Error:", error);
      return "An error occurred while talking with the chat bot.";
    }
  };

  const handleBackButtonPressed = () => {
    setSelectedChatId(undefined);
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
      <ToggleButton onClick={handleToggle} />
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
    </Flex>
  );
};

export default ChatBotPanel;
