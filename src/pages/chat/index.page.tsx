import React, { useState, useEffect } from "react";
import { Layout, List, Avatar, Divider, Typography, Spin, Badge } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { User, ChatRoom, Message } from "../../../types";
import MainLayout from "../../../components/MainLayout";
import axios from "../axiosFrontend";

import MessagesBar from "./MessageBar";
import ContactsBar from "./ContactsBar";
import AnalysisBar from "./AnalysisBar";
export const ADMIN_USER_ID = 1;

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
    <>
      <div className="flex flex-row space-x-5">
        <div className="flex flex-col w-1/3">{contactsBar}</div>
        <div className="flex flex-col w-1/3">{messagesBar}</div>
        <div className="flex flex-col w-1/3">{analysisBar}</div>
      </div>
    </>
  );
};

const fetchContacts = async (callback: any) => {
  const response = await axios.get(`/api/chat_rooms_for_user/${ADMIN_USER_ID}`);
  const contacts = response.data;
  callback(contacts);
  return contacts;
};

const ChatPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState<any>([]);
  const [selectedChatId, setSelectedChatId] = useState<string>("");
  const [chatRoomData, setChatRoomData] = useState<any>({}); // this also have message inside
  const [loadingChatRoomData, setLoadingChatRoomData] = useState(false);

  const fetchChatRoomData = async () => {
    if (!selectedChatId || selectedChatId.length === 0) return;
    try {
      const response = await axios.get(
        `/api/chat_rooms_with_messages/${selectedChatId}`
      );
      setChatRoomData(response.data);
      setLoadingChatRoomData(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoadingChatRoomData(true);
    fetchChatRoomData();
  }, [selectedChatId, contacts]);

  useEffect(() => {
    setLoading(true);
    fetchContacts((c: any) => {
      setContacts(c);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <Spin />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <ChatPageLayout
        contactsBar={
          <ContactsBar
            contacts={contacts}
            setSelectedChatId={setSelectedChatId}
            selectedChatId={selectedChatId}
          />
        }
        messagesBar={
          selectedChatId ? (
            <MessagesBar
              fetchChatRoomData={fetchChatRoomData}
              chatRoomData={chatRoomData}
              loading={loadingChatRoomData}
              selectedChatId={selectedChatId}
            />
          ) : (
            <div> Select a contact to get started.</div>
          )
        }
        analysisBar={
          selectedChatId ? (
            <AnalysisBar
              fetchChatRoomData={fetchChatRoomData}
              chatRoomData={chatRoomData}
              loading={loadingChatRoomData}
              selectedChatId={selectedChatId}
            />
          ) : (
            <div> Select a contact to get started.</div>
          )
        }
      />
    </MainLayout>
  );
};

export default ChatPage;
