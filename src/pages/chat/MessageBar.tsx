import {
  Avatar,
  Badge,
  Button,
  Card,
  Input,
  Skeleton,
  Spin,
  Typography,
  message,
} from "antd";

import { useEffect, useRef, useState } from "react";
import axios from "../axiosFrontend";
import { ADMIN_USER_ID } from "./index.page";
import useMessages from "../../../components/useMessages";
import { determineWhoIsOpponent } from "./AnalysisBar";
import useAsync from "../../../components/useAsync";

const { Text, Title } = Typography;
const { TextArea } = Input;

const useChatRoomMessages = (selectedChatId: string) => {
  const {
    execute,
    status: chatRoomMessagesStatus,
    value: chatRoomMessagesData,
  } = useAsync(() => {
    return axios
      .get(`/api/chat_rooms_with_messages/${selectedChatId}`)
      .then((res) => res.data);
  });

  useEffect(() => {
    execute();
  }, [execute, selectedChatId]);

  // eslint-disable-next-line no-nested-ternary, no-extra-boolean-cast
  const opponentId = !!chatRoomMessagesData
    ? chatRoomMessagesData.user1_id === 1
      ? chatRoomMessagesData.user2_id
      : chatRoomMessagesData.user1_id
    : "";

  const newchatRoomMessagesData = {
    ...chatRoomMessagesData,
    ...determineWhoIsOpponent(chatRoomMessagesData),
  };

  return {
    chatRoomMessagesStatus,
    chatRoomMessagesData: newchatRoomMessagesData,
    opponentId,
    execute,
  };
};

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
    // message.success("Message Sent!");
  } catch (error) {
    message.error(`Error has occured. ${error}`);
  }
};

/* A QUICK AND DIRTY HACK TO MAKE IT WORK 
THIS IS A TECHNICAL DEBT AND NOT A GOOD PATTERN
*/
const useMessagesToDisplay = (selectedChatId: number) => {
  const [messages, setMessages] = useState<any>([]);
  const [prevSelectedChatId, setPrevSelectedChatId] =
    useState<number>(selectedChatId);

  const { chatRoomMessagesData, chatRoomMessagesStatus, opponentId } =
    useChatRoomMessages(String(selectedChatId));
  const { messages: messagesFromSocket, loading: socketLoading } =
    useMessages(selectedChatId);

  /* FETCH once to load the old chats */
  useEffect(() => {
    if (
      (!chatRoomMessagesData?.messages || messagesFromSocket.length > 0) &&
      prevSelectedChatId === selectedChatId
    )
      return;
    setMessages(chatRoomMessagesData.messages);
    setPrevSelectedChatId(selectedChatId);
  }, [chatRoomMessagesData, selectedChatId]);

  /* KEEP updating if there is update from WEBSOCKET */
  useEffect(() => {
    if (!chatRoomMessagesData?.messages) return;
    setMessages((prev: any) => [
      ...chatRoomMessagesData.messages,
      ...messagesFromSocket.filter(
        (item: any) => item.chat_room_id === selectedChatId
      ),
    ]);
  }, [messagesFromSocket]);

  return {
    chatRoomMessagesData,
    messages,
    loading: socketLoading || chatRoomMessagesStatus === "LOADING",
    opponentId,
  };
};

const CardTitle = ({
  title,
  avatar,
  description,
  loading,
}: {
  title: string;
  avatar: string;
  description: string;
  loading: boolean;
}) => {
  if (loading) return <Skeleton />;
  return (
    <div className="flex flex-row min-w-full space-x-5 p-2 ml-5 my-1 items-center">
      <div className="flex items-center">
        <img src={avatar} alt="profile" className="h-12 w-12 rounded-xl" />
      </div>
      <div className="flex flex-col min-h-full">
        <div>{title}</div>
        <div className="flex flex-row space-x-2">
          <Badge status="success" />
          <Text className="text-md text-gray-400 font-light">
            {description}
          </Text>
        </div>
      </div>
    </div>
  );
};

const MessagesBar = ({ selectedChatId }: any) => {
  const [inputValue, setInputValue] = useState("");
  const { messages, loading, opponentId, chatRoomMessagesData } =
    useMessagesToDisplay(selectedChatId);
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef<HTMLDivElement>(null);
    useEffect(() => elementRef.current?.scrollIntoView());
    return <div ref={elementRef} />;
  };

  // eslint-disable-next-line camelcase
  const { opponent_picture, opponent_first_name, opponent_second_name } =
    chatRoomMessagesData;

  return (
    <Card
      loading={loading}
      title={
        <CardTitle
          loading={loading}
          avatar={opponent_picture}
          title={`${opponent_first_name} ${opponent_second_name}`}
          description="online"
        />
      }
      headStyle={{ padding: "0" }}
      className="rounded-lg h-full"
    >
      <div className="flex flex-col h-full">
        <div
          className="flex-1 overflow-y-auto"
          style={{ minHeight: "63vh", maxHeight: "63vh" }}
        >
          {messages.map((chatMessage: any, index: number) => (
            <ChatListItem
              key={chatMessage.id}
              message={chatMessage.content}
              timestamp={chatMessage.created_at}
              isNotMyself={chatMessage.sender_id !== ADMIN_USER_ID}
            />
          ))}
          <AlwaysScrollToBottom />
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
                receiver_id: opponentId,
                timestamp: new Date().toISOString(),
                read: false,
                message_type: "string",
                sentiment_analysis_score: 0.5,
                chat_room_id: selectedChatId,
              });
              setInputValue("");
            }}
          />
        </div>
      </div>
    </Card>
  );
};

export default MessagesBar;
