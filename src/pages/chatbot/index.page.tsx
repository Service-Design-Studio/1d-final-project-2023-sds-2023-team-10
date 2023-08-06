import React, { useState, useEffect } from "react";
import { Typography, Spin, message, Alert, Empty, Card, Button } from "antd";

import MainLayout from "../../../components/MainLayout";
import axios from "../axiosFrontend";

import MessagesBar from "./MessageBar";
import ContactsBar from "./ContactsBar";
import AnalysisBar from "./AnalysisBar";
import withAuth from "../../../components/withAuth";
import useUser from "../../../components/useUser";

const { Title } = Typography;

export const ADMIN_USER_ID = 1;

const barStyle = {
  maxHeight: "calc(100vh - 162px)",
  margin: "10px",
  minWidth: "30%",
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
    <div
      className="flex flex-row space-x-5 min-h-full"
      style={{ minHeight: "calc(100vh - 162px)" }}
    >
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
const stringifySorted = (arr: any[]) =>
  JSON.stringify(arr.sort((a, b) => a.id - b.id));

const handleNewMessage = (prev: any, fetchedContacts: any) => {
  if (!prev) return;
  if (stringifySorted(prev) !== stringifySorted(fetchedContacts)) {
    // Identify the sender of the new message
    const newMessageSender = fetchedContacts.find((contact: any) => {
      const prevContact = prev.find((pc: any) => pc.id === contact.id);
      return (
        !prevContact ||
        prevContact.last_message?.id !== contact.last_message?.id
      );
    });
    const senderName = newMessageSender
      ? `${newMessageSender.opponent_first_name} ${newMessageSender.opponent_second_name}`
      : "Unknown";

    if (newMessageSender?.last_message?.sender_id === ADMIN_USER_ID) return;
    message.info(`New Message from ${senderName}`);
  }
};

const fetchContacts = async (callback: any) => {
  const response = await axios.get("/api/chat_rooms?ai=true");
  const contacts = response.data;
  callback(contacts);
  return contacts;
};

const ChatPage: React.FC = () => {
  const [loadingContacts, setLoading] = useState(true);
  const [contacts, setContacts] = useState<any>([]);
  const [selectedChatId, setSelectedChatId] = useState<string>("");
  const [user, token, loading, clearUser] = useUser();

  useEffect(() => {
    const fetchContactsAndSetState = () => {
      fetchContacts((fetchedContacts: any) => {
        setContacts((prev: any) => {
          handleNewMessage(prev, fetchedContacts);
          return fetchedContacts;
        });
        setLoading(false);
      }).catch((error) => {
        console.error(error);
        setLoading(false);
      });
    };

    // Fetch contacts immediately and then every 10 seconds
    fetchContactsAndSetState();
    const intervalId = setInterval(fetchContactsAndSetState, 2000); // in milliseconds

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

  //   if (loading) {
  //     return (
  //       <MainLayout>
  //         <div className="flex flex-col min-h-screen min-w-screen items-center justify-center">
  //           <Spin size="large" />
  //           <Title level={4}>Loading Chat Data...</Title>
  //         </div>
  //       </MainLayout>
  //     );
  //   }

  return (
    <MainLayout useFooter={false}>
      <Alert
        closable
        message="This is the chatlogs from client to AI chatbot. On the message bar, message from AI and client indicated on the right and left respectively."
        type="info"
        showIcon
        className="h-12 mt-3 w-fit ml-3"
      />
      <ChatPageLayout
        contactsBar={
          !(loadingContacts || loading) ? (
            <ContactsBar
              user={user}
              contacts={contacts}
              setSelectedChatId={setSelectedChatId}
              selectedChatId={selectedChatId}
            />
          ) : (
            <Card className="min-h-full flex items-center justify-center space-x-3">
              <Spin size="default" className="mr-5" />
              Loading AI Chat Data...
            </Card>
          )
        }
        messagesBar={
          selectedChatId ? (
            <MessagesBar selectedChatId={selectedChatId} />
          ) : (
            <Card className="min-h-full flex items-center justify-center">
              <Empty
                description="Select a contact to get started"
                className="min-h-full"
              />
            </Card>
          )
        }
        analysisBar={
          selectedChatId ? (
            <AnalysisBar selectedChatId={selectedChatId} />
          ) : (
            <Card className="min-h-full flex items-center justify-center">
              <Empty
                description="Select a contact to get started"
                className="min-h-full"
              />
            </Card>
          )
        }
      />
    </MainLayout>
  );
};

export default withAuth(ChatPage);
