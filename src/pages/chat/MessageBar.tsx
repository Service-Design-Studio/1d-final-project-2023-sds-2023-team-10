import { Avatar, Button, Card, Input, Spin, Typography } from "antd";

import axios from "axios";
import { useEffect, useState } from "react";

const { Text } = Typography;
const { TextArea } = Input;

const ChatListItem = ({
  message: chatMessage,
  isMyself,
  avatar,
  timestamp,
  hidden = false,
}: any) => {
  const messageClass = `p-2 rounded-lg ${
    isMyself ? "bg-gray-100" : "bg-blue-200 self-end"
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
            marginLeft: isMyself ? "0" : "auto",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: isMyself ? "10px" : "0",
            borderTopRightRadius: "10px",
            borderTopLeftRadius: isMyself ? "0" : "10px",
            paddingBottom: "10px",
            position: "relative",
          }}
        >
          <div className="flex flex-col">
            <div className="flex items-center">
              {isMyself ? avatarComponent : null}
              {messageComponent}
              {timestamp && timestampComponent}
            </div>
          </div>
        </div>

        {!isMyself ? avatarComponent : null}
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

const handleSendMessage = async () => {
  return;
};

const MessagesBar = ({ selectedChatId }: any) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/message/${selectedChatId}`);
        setMessages(response.data.messages);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, [selectedChatId]);

  if (loading) {
    return <Spin />;
  }

  return (
    <div>
      <Card title="Chat" className="rounded-lg" style={{ minHeight: "80vh" }}>
        <div className="flex flex-col h-full">
          <div
            className="flex-1 overflow-y-auto"
            style={{ minHeight: "70vh", maxHeight: "70vh" }}
          >
            {messages.map((chatMessage: any, index) => (
              <ChatListItem
                key={chatMessage.id}
                message={chatMessage.content}
                timestamp={chatMessage.created_at}
              />
            ))}
          </div>
          <div className="mt-4">
            <ChatInput
              value={inputValue}
              onChange={(e: any) => setInputValue(e.target.value)}
              onSend={handleSendMessage}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MessagesBar;
