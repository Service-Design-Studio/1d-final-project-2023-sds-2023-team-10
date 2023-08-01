import React, { useState, useEffect } from "react";
import { Typography, Spin } from "antd";

import MainLayout from "../../../components/MainLayout";
import axios from "../axiosFrontend";

import MessagesBar from "./MessageBar";
import ContactsBar from "./ContactsBar";
import AnalysisBar from "./AnalysisBar";
import withAuth from "../../../components/withAuth";

const { Title } = Typography;

export const ADMIN_USER_ID = 1;

const barStyle = {
  maxHeight: "calc(100vh - 152px)",
  margin: "10px",
};

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
    <div className="flex flex-row space-x-5">
      <div className="flex flex-col w-1/3" style={barStyle}>
        {contactsBar}
      </div>
      <div className="flex flex-col w-1/3" style={barStyle}>
        {messagesBar}
      </div>
      <div className="flex flex-col w-1/3" style={barStyle}>
        {analysisBar}
      </div>
    </div>
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

  useEffect(() => {
    const fetchContactsAndSetState = () => {
      fetchContacts((fetchedContacts: any) => {
        setContacts(fetchedContacts);
        setLoading(false);
      }).catch((error) => {
        console.error(error);
        setLoading(false);
      });
    };

    // Fetch contacts immediately and then every 10 seconds
    fetchContactsAndSetState();
    const intervalId = setInterval(fetchContactsAndSetState, 10000); // in milliseconds

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // useEffect(() => {
  //   setLoading(true);
  //   fetchContacts((c: any) => {
  //     setContacts(c);
  //     setLoading(false);
  //   });
  // }, []);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex flex-col min-h-screen min-w-screen items-center justify-center">
          <Spin size="large" />
          <Title level={4}>Loading Chat Data...</Title>
        </div>
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
            <MessagesBar selectedChatId={selectedChatId} />
          ) : (
            <div> Select a contact to get started.</div>
          )
        }
        analysisBar={
          selectedChatId ? (
            <AnalysisBar selectedChatId={selectedChatId} />
          ) : (
            <div> Select a contact to get started.</div>
          )
        }
      />
    </MainLayout>
  );
};

export default withAuth(ChatPage);
