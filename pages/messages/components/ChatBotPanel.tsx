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
  handleGoToBotChat: () => void; // Add handleGoToBotChat function as a prop
};

const ChatBotPanel: React.FC<ChatBotPanelProps> = ({
  selectedChatId,
  handleGoToBotChat,
}) => {
  const [chatRoom, setChatRoom] = useState<ChatRoomWithMessages>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [currentContext, setCurrentContext] = useState<Array<any>>([]);
  const [chatLog, setChatLog] = useState([{
    role: "system",
    content:
      "You are a counsellor that talks to people going through unplanned pregnancies (Please give an appropriate response if you feel the message isn't anything related to the scope of assistance you can provide as an unplanned pregnancy counsellor)",
  }]);

  useEffect(() => {
   
  }, [chatLog]);

  selectedChatId = -1;

  const handleToggle = () => {
    handleGoToBotChat(); // Call the handleGoToBotChat function directly when the button is clicked
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
  
    }
    setLoadingMessages(false);
  };

  const fetchOpponentUser = async () => {
    try {
      // Instead of getting the id from chatRoom, assign a hardcoded user id of -1
      const opponentUserId = -1;

      // Fetch the user as usual
      const response = await axios.get(`/api/users/${opponentUserId}`);
    } catch (error) {
     
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

  useEffect(() => {
   
  }, [chatLog]);
 


  async function handleSendMessage() {
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
    const newLog = {
      role: "user",
      content: inputMessage,
    };
  
    
  
    var botResponse = await getChatbotResponse([...chatLog,newLog]);
  
    setCurrentContext((prevContext) => [
      ...prevContext,
      "User: " + inputMessage,
      "Bot: " + botResponse,
    ]);

    // Create a new message for the bot's response
    if (botResponse === "") {
      botResponse =
        "I do not understand your input, could you word that differently for me?";
    }
  
    const newBotLog = {
      role: "bot",
      content: botResponse,
    };
  
    setChatLog((prevChatLog) => [...prevChatLog,newLog,newBotLog]);

    console.log("CHATLOG WITH BOT RESPONSE", chatLog)
  
    const botMessage = createNewMessage(-1, botResponse);
  
    // Add the new message to your state
    setMessages((old) => [...old, botMessage]);
  }
  
  

  // Helper function to send a request to your API which will in turn communicate with GPT-3. You'll need to implement this.





  const getChatbotResponse = async (chatLog) => {
    try {
      console.log("chatLog",chatLog)
      const response = await axios.post("/api/chat_room_bot", {
        chatLog: chatLog
      });
     
      // Right here we are assuming the server will respond with a JSON that has the bot response in a property named 'message'
      return response.data.message;
    } catch (error) {
      return "An error occurred while talking with the chat bot.";
    }
  };

  const handleBackButtonPressed = () => {
    handleGoToBotChat();
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
          opponentUser={"Chatbot"}
        />
        <Divider />
        <Messages messages={messages} opponentUser={"Chatbot"} />
        <Divider />
        <Footer
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage} // Pass the function reference to Footer
        />
      </Flex>
    </Flex>
  );
};

export default ChatBotPanel;
