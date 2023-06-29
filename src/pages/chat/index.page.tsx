import React, { useState } from "react";
import { Layout, List, Avatar, Divider, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { User, ChatRoom, Message } from "../../../types";
import MainLayout from "../../../components/MainLayout";
import ContactsBar from "./ContactsBar";

const { Sider, Content, Footer } = Layout;
const { Title } = Typography;

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
      <div className="flex flex-row">
        <div className="flex flex-col w-1/3">{contactsBar}</div>
        <div className="flex flex-col w-1/3">{messagesBar}</div>
        <div className="flex flex-col w-1/3">{analysisBar}</div>
      </div>
    </>
  );
};

const MessagesBar = () => {
  return <div className="flex flex-row">messagesbar </div>;
};

const AnalysisBar = () => {
  return <div className="flex flex-row">analysisbar </div>;
};

// const Temp = () => {
//   return (
//     <Layout style={{ height: "85vh" }}>
//       <div className="flex w-1/3">
//         <Title level={3} className="p-4">
//           Contacts
//         </Title>
//         <Divider />
//         <List
//           itemLayout="horizontal"
//           dataSource={dummyUsers}
//           renderItem={(item) => (
//             <List.Item>
//               <List.Item.Meta
//                 avatar={<Avatar icon={<UserOutlined />} />}
//                 title={
//                   <a onClick={() => handleSelectChat(dummyChatRooms[0])}>
//                     {item.profile}
//                   </a>
//                 }
//               />
//             </List.Item>
//           )}
//         />
//       </div>
//       <div>
//         <Layout style={{ flexDirection: "column" }}>
//           <Content
//             className="overflow-auto p-4"
//             style={{ backgroundColor: "#E5DDD5" }}
//           >
//             {selectedChat &&
//               selectedChat.messages.map((message, index) => (
//                 <div
//                   key={index}
//                   className={`p-2 rounded-lg my-2 ${
//                     message.senderId === "1"
//                       ? "ml-auto bg-white"
//                       : "bg-green-200"
//                   }`}
//                 >
//                   {message.content}
//                 </div>
//               ))}
//           </Content>
//           <Footer>{/* Add your message input and send button here */}</Footer>
//         </Layout>
//       </div>
//       <div>
//         <Sider theme="light" width={250}>
//           {/* Add the contact summary here */}
//         </Sider>
//       </div>
//     </Layout>
//   );
// };

const ChatPage: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<ChatRoom | null>(null);
  const dummyUsers: User[] = [
    { type: "client", id: "1", phoneNumber: "John" },
    { type: "admin", id: "2", phoneNumber: "Admin" },
    // Add more dummy users
  ];
  const dummyChat: Message[] = [
    {
      senderId: "1",
      receiverId: "2",
      timestamp: new Date(),
      sentimentAnalysisScore: 0.8,
      content: "Hello, how are you?",
      type: "text",
    },
    // Add more dummy messages
  ];

  const dummyChatRooms: ChatRoom[] = [
    {
      overallSentimentAnalysisScore: 0.9,
      chatRoomId: "123",
      dateCreated: new Date(),
      participants: ["1", "2"],
      isAIChat: false,
      isGroupChat: false,
      messages: dummyChat,
    },
    // Add more dummy chat rooms
  ];

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
