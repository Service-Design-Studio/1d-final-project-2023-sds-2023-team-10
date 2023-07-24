import { Avatar, Button, Card, Input, Spin, Typography, message } from "antd";

import axios from "../axiosFrontend";
import { useEffect, useRef, useState } from "react";
import { ADMIN_USER_ID } from "./index.page";

const { Text } = Typography;
const { TextArea } = Input;

const ChatListItem = ({
  message: chatMessage,
  isNotMyself,
  avatar,
  timestamp,
  hidden = false,
}: any) => {
  const messageClass = `p-2 rounded-lg ${
    isNotMyself ? "bg-gray-100" : "bg-blue-200 self-end"
  }`;
  const avatarComponent = avatar ? (
    <Avatar src={avatar} className="mr-2" />
  ) : null;
  const messageComponent = <Text>{chatMessage}</Text>;
  const timestampComponent = (
    <Text type="secondary" className="text-xs ml-3 mt-3">
      {new Date(timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </Text>
  );
  return (
    <div className={hidden ? "hidden" : ""}>
      <div className="flex flex-row mb-2">
        <div
          className={messageClass}
          style={{
            marginLeft: isNotMyself ? "0" : "auto",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: isNotMyself ? "10px" : "0",
            borderTopRightRadius: "10px",
            borderTopLeftRadius: isNotMyself ? "0" : "10px",
            paddingBottom: "10px",
            position: "relative",
          }}
        >
          <div className="flex flex-col">
            <div className="flex items-center">
              {isNotMyself ? avatarComponent : null}
              {messageComponent}
              {timestamp && timestampComponent}
            </div>
          </div>
        </div>

        {!isNotMyself ? avatarComponent : null}
      </div>
    </div>
  );
};

const ChatInput = ({ value, onChange, onSend }: any) => {
  return (
    <div className="flex flex-row">
      <TextArea
        rows={2}
        placeholder="Type your message here"
        value={value}
        onChange={onChange}
        className="mr-2"
        onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend();
          }
        }}
      />
      <Button type="primary" onClick={onSend}>
        Send
      </Button>
    </div>
  );
};

const handleSendMessage = async (props: any) => {
  try {
    const response = await axios.post("/api/messages", props, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    message.success("Message Sent!");
  } catch (error) {
    message.error(`Error has occured. ${error}`);
  }

  return;
};

const MessagesBar = ({
  selectedChatId,
  chatRoomData,
  fetchChatRoomData,
  loading,
}: any) => {
  const [inputValue, setInputValue] = useState("");

  // const AlwaysScrollToBottom = () => {
  //   const elementRef = useRef<HTMLDivElement>(null);
  //   useEffect(() => elementRef.current?.scrollIntoView());
  //   return <div ref={elementRef} />;
  // };

  if (loading) {
    return <Spin />;
  }

  return (
    <div>
      <Card title="Chat" className="rounded-lg" style={{ height: "90vh" }}>
        <div className="flex flex-col h-full">
          <div
            className="flex-1 overflow-y-auto"
            style={{ minHeight: "70vh", maxHeight: "70vh" }}
          >
            {chatRoomData.messages.map((chatMessage: any, index: number) => (
              <ChatListItem
                key={chatMessage.id}
                message={chatMessage.content}
                timestamp={chatMessage.created_at}
                isNotMyself={chatMessage.sender_id !== ADMIN_USER_ID}
              />
            ))}
            {/* <AlwaysScrollToBottom /> */}
          </div>
          <div className="mt-4">
            <ChatInput
              value={inputValue}
              onChange={(e: any) => setInputValue(e.target.value)}
              onSend={() => {
                if (!inputValue) return;
                handleSendMessage({
                  sender_id: ADMIN_USER_ID,
                  content: inputValue,
                  receiver_id: chatRoomData.opponent_id,
                  timestamp: new Date().toISOString(),
                  read: false,
                  message_type: "text",
                  sentiment_analysis_score: 0.5,
                  chat_room_id: selectedChatId,
                });
                setInputValue("");
                fetchChatRoomData();
              }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MessagesBar;
