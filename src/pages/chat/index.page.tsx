import React, { useState, useEffect } from "react";
import { Layout, List, Avatar, Divider, Typography, Spin, Badge } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { User, ChatRoom, Message } from "../../../types";
import MainLayout from "../../../components/MainLayout";
import axios from "axios";
import VirtualList from "rc-virtual-list";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import MessagesBar from "./MessageBar";

const { Sider, Content, Footer } = Layout;
const { Title } = Typography;

const ADMIN_USER_ID = 1;

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

const AnalysisBar = () => {
  return <div className="flex flex-row">analysisbar </div>;
};

const ContactsBar = ({ contacts, setSelectedChatId }: any) => {
  return (
    <List style={{ width: "100%" }}>
      <VirtualList data={contacts} height={800} itemKey="id">
        {(chatroom: any) => {
          console.log("USER", chatroom);
          return (
            <List.Item
              key={chatroom.id}
              className="cursor-pointer"
              onClick={() => {
                setSelectedChatId(chatroom.id);
              }}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={chatroom.opponent_picture}
                    size={"large"}
                    icon={<UserOutlined />}
                  />
                }
                title={
                  chatroom.opponent_first_name && chatroom.opponent_second_name
                    ? `${chatroom.opponent_first_name} ${chatroom.opponent_second_name}`
                    : "Guest user " + chatroom.id
                }
                description={chatroom.last_message?.content}
              />
              <Badge
                className="site-badge-count-109"
                count={
                  chatroom.unread_messages_count > 0
                    ? chatroom.unread_messages_count
                    : 0
                }
                style={{ backgroundColor: "#52c41a" }}
              />
              <ExclamationCircleOutlined />
            </List.Item>
          );
        }}
      </VirtualList>
    </List>
  );
};

const fetchContacts = async (callback: any) => {
  const response = await axios.get(`/api/chat/${ADMIN_USER_ID}`);
  const contacts = response.data;
  callback(contacts);
  return contacts;
};

const ChatPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<any>([]);
  const [selectedChatId, setSelectedChatId] = useState<string>("");
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
          />
        }
        messagesBar={
          selectedChatId ? (
            <MessagesBar selectedChatId={selectedChatId} />
          ) : (
            <div> Select a contact to get started.</div>
          )
        }
        analysisBar={<AnalysisBar />}
      />
    </MainLayout>
  );
};

export default ChatPage;
