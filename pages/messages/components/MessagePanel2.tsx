import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import Divider from "./Divider";
import Footer from "./Footer";
import Header from "./Header";
import Messages from "./Messages";

const MessagePanel: React.FC = () => {
  const [messages, setMessages] = useState([
    { from: "computer", text: "Hi, is this a counsellor?" },
    { from: "me", text: "Hey there! Yup!" },
    { from: "me", text: "I need help." },
    {
      from: "computer",
      text: "I'm all ears!",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim().length) {
      return;
    }
    const data = inputMessage;

    setMessages((old) => [...old, { from: "me", text: data }]);
    setInputMessage("");

    setTimeout(() => {
      setMessages((old) => [...old, { from: "computer", text: data }]);
    }, 1000);
  };

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
      <Flex w="100%" h="100%" flexDir="column">
        <Header />
        <Divider />
        <Messages messages={messages} />
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

export default MessagePanel;
