import React, { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import { ChatRoom, Message, User } from "../../types";

const ChatPageLayout = ({
  contactsBar,
  messagesBar,
  analysisBar,
}: {
  contactsBar: React.ReactNode;
  messagesBar: React.ReactNode;
  analysisBar: React.ReactNode;
}) => {
  return (
    <div className="flex flex-row">
      <div
        className="flex flex-col w-1/3 overflow-hidden"
        style={{ maxWidth: "33.33%", minWidth: "33.33%" }}
      >
        {contactsBar}
      </div>
      <div
        className="flex flex-col w-1/3 overflow-hidden"
        style={{ maxWidth: "33.33%", minWidth: "33.33%" }}
      >
        {messagesBar}
      </div>
      <div
        className="flex flex-col w-1/3 overflow-hidden"
        style={{ maxWidth: "33.33%", minWidth: "33.33%" }}
      >
        {analysisBar}
      </div>
    </div>
  );
};

const ContactsBar = () => {
  return <div className="flex flex-row">contactbar </div>;
};

const MessagesBar = () => {
  return <div className="flex flex-row">messagesbar </div>;
};

const AnalysisBar = () => {
  return <div className="flex flex-row">analysisbar </div>;
};

const ChatPage: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<ChatRoom | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [chat, setChat] = useState<Message[]>([]);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));

    fetch("/api/chat")
      .then((response) => response.json())
      .then((data) => setChat(data));

    fetch("/api/chatRooms")
      .then((response) => response.json())
      .then((data) => setChatRooms(data));
  }, []);

  const handleSelectChat = (chat: ChatRoom) => {
    setSelectedChat(chat);
  };

  return (
    <MainLayout>
      <ChatPageLayout
        contactsBar={<ContactsBar />}
        messagesBar={<MessagesBar />}
        analysisBar={<AnalysisBar />}
      />
    </MainLayout>
  );
};

export default ChatPage;
