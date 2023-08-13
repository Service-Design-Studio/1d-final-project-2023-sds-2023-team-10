/* eslint-disable no-plusplus */
/* eslint-disable react/no-unstable-nested-components */
import {
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
  Image,
  Input,
  Popover,
  Skeleton,
  Spin,
  Typography,
  message,
} from "antd";

import {
  Dispatch,
  SetStateAction,
  use,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { GiBrain } from "@react-icons/all-files/gi/GiBrain";
import axios from "../axiosFrontend";
import { ADMIN_USER_ID } from "./index.page";
import useMessages from "../../../components/useMessages";
import { determineWhoIsOpponent } from "./AnalysisBar";
import useAsync from "../../../components/useAsync";
import useUser from "../../../components/useUser";

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

  const [user] = useUser();

  // eslint-disable-next-line no-nested-ternary, no-extra-boolean-cast
  const opponentId = !!chatRoomMessagesData
    ? chatRoomMessagesData.user1_id === user?.id
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

  const [componentLoading, setComponentLoading] = useState<boolean>(true);

  const { chatRoomMessagesData, chatRoomMessagesStatus, opponentId } =
    useChatRoomMessages(String(selectedChatId));
  const { messages: messagesFromSocket, loading: socketLoading } =
    useMessages(selectedChatId);

  /* FETCH once to load the old chats */
  useEffect(() => {
    setComponentLoading(true);
    if (
      (!chatRoomMessagesData?.messages || messagesFromSocket.length > 0) &&
      prevSelectedChatId === selectedChatId
    ) {
      setComponentLoading(false);
      return;
    }
    setMessages(chatRoomMessagesData.messages);
    setPrevSelectedChatId(selectedChatId);
    setComponentLoading(false);
  }, [
    chatRoomMessagesData,
    messagesFromSocket.length,
    prevSelectedChatId,
    selectedChatId,
  ]);

  /* KEEP updating if there is update from WEBSOCKET */
  useEffect(() => {
    setComponentLoading(true);
    if (!chatRoomMessagesData?.messages) {
      setComponentLoading(false);
      return;
    }
    setMessages((prev: any) => [
      ...chatRoomMessagesData.messages,
      ...messagesFromSocket.filter(
        (item: any) => item.chat_room_id === selectedChatId
      ),
    ]);
    setComponentLoading(false);
  }, [chatRoomMessagesData.messages, messagesFromSocket, selectedChatId]);

  return {
    chatRoomMessagesData,
    messages,
    loading:
      socketLoading || chatRoomMessagesStatus === "LOADING" || componentLoading,
    opponentId,
  };
};

const CardTitle = ({
  title,
  avatar,
  description,
  loading,
  isPopoverOpen,
  setIsPopoverOpen,
  messagesToSummarize,
  selectedChatId,
}: {
  title: string;
  avatar: string;
  description: string;
  loading: boolean;
  isPopoverOpen: boolean;
  setIsPopoverOpen: Dispatch<SetStateAction<boolean>>;
  messagesToSummarize: any;
  selectedChatId: number;
}) => {
  const [summary, setSummary] = useState<string>("");

  useEffect(() => {
    setSummary("");
  }, [selectedChatId]);

  const { execute, status, value } = useAsync(() => {
    return axios
      .post("/api/chatgpt", { messages: messagesToSummarize })
      .then((res) => {
        const summaryResponse = res.data;
        setSummary(summaryResponse.content);
      });
  });

  const generateSummary = async () => {
    execute();
  };

  const SummaryContent = () => {
    return (
      <div style={{ minWidth: "450px", maxWidth: "450px", padding: "10px" }}>
        <Button
          type="primary"
          onClick={() => {
            generateSummary();
          }}
          disabled={status === "LOADING"}
        >
          Generate AI Summary
        </Button>
        <Divider className="my-4" />
        {status === "LOADING" && (
          <div className="mb-2 flex flex-row">
            <Spin className="mr-3 mb-1" />
            <div>Generating a new AI Summary...</div>
          </div>
        )}
        {summary ||
          (status !== "LOADING" &&
            "No Summary Yet. Click the button above to generate one.")}
      </div>
    );
  };
  if (loading) return <Skeleton className="h-12 w-12" />;

  return (
    <div className="flex flex-row min-w-full space-x-5 p-2 ml-5 my-1 items-center justify-between">
      <div className="flex flex-row">
        <div className="flex items-center">
          <Image
            src={avatar}
            alt="profile"
            height={48}
            className="h-12 w-12 rounded-xl"
            fallback="data:image/png;base64,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"
          />
        </div>
        <div className="flex flex-col min-h-full ml-4">
          <div>{title}</div>
          <div className="flex flex-row space-x-2">
            <Badge status="success" />
            <Text className="text-md text-gray-400 font-light">
              {description}
            </Text>
          </div>
        </div>
      </div>
      <Popover
        className="right-10"
        onOpenChange={() => setIsPopoverOpen(!isPopoverOpen)}
        open={isPopoverOpen}
        placement="bottom"
        content={<SummaryContent />}
      >
        <Button type="primary">
          <div className="flex flex-row items-center pb-1">
            <GiBrain className="mr-2 h-5 w-4" style={{ marginTop: "0px" }} />
            AI Summarize
          </div>
        </Button>
      </Popover>
    </div>
  );
};

const aggregateAllMessagesTogeter = (messages: any) => {
  // [{ role: "user", content: "Hello world" }, { role: "assistant", content: "reply from assistant" }]
  return messages.map((message1: any) => {
    return {
      role: message1.sender_id === -1 ? "assistant" : "user",
      content: message1.content,
    };
  });
};

const transformMessages = (messages: any) => {
  if (!messages || messages.length === 0) return [];
  const transformed = [];
  let currentRole = messages[0].sender_id === 1 ? "assistant" : "user";
  let aggregatedContent = "";

  for (let i = 0; i < messages.length; i++) {
    const messageRole = messages[i].sender_id === 1 ? "assistant" : "user";

    if (messageRole !== currentRole) {
      transformed.push({
        role: currentRole,
        content: aggregatedContent.trim(),
      });
      aggregatedContent = "";
      currentRole = messageRole;
    }

    aggregatedContent += `${messages[i].content} `;

    if (i === messages.length - 1) {
      // if it's the last message, push it to the result
      transformed.push({
        role: currentRole,
        content: aggregatedContent.trim(),
      });
    }
  }
  transformed.push({
    role: "user",
    content: `Summarize the conversation previously! Make sure it is concise and detailed. 
      Your summary will be read by a pregnancy counsellor that will need to get the idea of what happen (critical problems) that the client (pregnancy women, or person in distress with mental health issues) faces.
      Then in a short sentence briefly describe on how the counsellor should help them/approach the situation
      Your answer should follow this format:
      Summary: 
      [Enter your summary here]
      [Enter or \n to put empty space, make it readable]
      Approach:
      [Enter your recommended approach here] 
      `,
  });

  return transformed;
};

const MessagesBar = ({ selectedChatId }: any) => {
  const [inputValue, setInputValue] = useState("");
  const { messages, loading, opponentId, chatRoomMessagesData } =
    useMessagesToDisplay(selectedChatId);
  // eslint-disable-next-line react/no-unstable-nested-components

  const elementRef = useRef<HTMLDivElement>(null);
  useEffect(() => elementRef.current?.scrollIntoView(), [messages]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [user] = useUser();

  const memoizedMessageList = useMemo(() => {
    const messagesToDisplay = messages.map(
      (chatMessage: any, index: number) => (
        <ChatListItem
          key={chatMessage.id}
          message={chatMessage.content}
          timestamp={chatMessage.created_at}
          isNotMyself={chatMessage.sender_id !== user?.id}
        />
      )
    );

    return messagesToDisplay;
  }, [messages]);

  // eslint-disable-next-line camelcase
  const { opponent_picture, opponent_first_name, opponent_second_name } =
    chatRoomMessagesData;

  return (
    <Card
      loading={loading}
      title={
        <CardTitle
          selectedChatId={selectedChatId}
          messagesToSummarize={transformMessages(messages)}
          setIsPopoverOpen={setIsPopoverOpen}
          isPopoverOpen={isPopoverOpen}
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
          {memoizedMessageList}
          <div ref={elementRef} />
        </div>
        <div className="mt-4">
          <ChatInput
            value={inputValue}
            onChange={(e: any) => setInputValue(e.target.value)}
            onSend={() => {
              if (!inputValue) return;
              handleSendMessage({
                sender_id: user?.id,
                content: inputValue,
                receiver_id: opponentId,
                timestamp: new Date().toISOString(),
                read: false,
                message_type: "string",
                sentiment_analysis_score: 1,
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
