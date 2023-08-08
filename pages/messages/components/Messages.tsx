<<<<<<< HEAD
import React, { useEffect, useRef, useState } from "react";
=======
import React, { useEffect, useMemo, useRef, useState } from "react";
>>>>>>> 6853ce97dbdee67d867406f2d7d8bd10eb7224ec
import { Avatar, Flex, Text } from "@chakra-ui/react";
import { Message, User } from "@/types";
import useUser from "@/components/useUser";
import { chatbotAvatarUrl, defaultAvatarUrl } from "./ContactPanel";

const ChatBotLoadingMessage = () => {
  return (
    <Flex w="100%">
      <Avatar name="Computer" src={chatbotAvatarUrl} bg="blue.300"></Avatar>
      <Flex
        bg="#EFEEF4"
        color="#454C52"
        minW="30px"
        maxW="350px"
        my="1"
        p="3"
        ml="0px"
        borderRadius="20px"
      >
        <Text>...</Text>
      </Flex>
    </Flex>
  );
};

const ChatListItem = ({
  message,
  timestamp,
  isNotMyself,
  opponentUserImg,
}: {
  message: string;
  timestamp: string;
  isNotMyself: boolean;
  opponentUserImg: string | undefined;
}) => {
  if (!isNotMyself) {
    return (
      <Flex w="100%" justify="flex-end">
        <Flex
          bg="#BB6192"
          color="white"
          minW="30px"
          maxW="350px"
          my="1"
          p="3"
          borderRadius="20px"
        >
          <Text>{message}</Text>
        </Flex>
      </Flex>
    );
  } else {
    return (
      <Flex w="100%">
        <Avatar
          name="Computer"
          src={opponentUserImg ? opponentUserImg : defaultAvatarUrl}
          bg="blue.300"
        ></Avatar>
        <Flex
          bg="#EFEEF4"
          color="#454C52"
          minW="30px"
          maxW="350px"
          my="1"
          p="3"
          ml="0px"
          borderRadius="20px"
        >
          <Text>{message}</Text>
        </Flex>
      </Flex>
    );
  }
};

type MessagesProps = {
  messages: Message[];
  opponentUser: User | undefined;
  isLoadingChatBotMessages?: boolean;
};

const Messages: React.FC<MessagesProps> = ({
  messages,
  opponentUser,
  isLoadingChatBotMessages,
}) => {
  const [user, isLoadingUser] = useUser();
  // State variable to keep track of whether the messages have loaded for the first time
  const [hasInitialLoad, setHasInitialLoad] = useState(false);

  const userId = user?.id;
<<<<<<< HEAD

  const [chatRoomId, setChatRoomId] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (userId && opponentUser) {
      // Check if the chat room between the current user and opponentUser already exists
      checkChatRoomExists(userId, -1);
    }
  }, [userId, opponentUser]);

  const checkChatRoomExists = async (user1Id: number, user2Id: number) => {
    try {
      const response = await axios.get(
        `/api/chat_rooms}`
      );
      if (response.data) {
        // Chat room already exists, set its ID
        setChatRoomId(response.data.id);
      } else {
        // Chat room doesn't exist, create a new one
        createChatRoom(user1Id, -1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createChatRoom = async (user1Id: number, user2Id: number) => {
    const newChatRoom: ChatRoomBeforeSend = {
      user1_id: user1Id,
      user2_id: -1 * user1Id,
      date_created: new Date().toISOString(),
      is_ai_chat: false,
      is_group_chat: false,
      overall_sentiment_analysis_score: 0,
    };

    try {
      const response = await axios.post("/api/chat_rooms/", newChatRoom);
      setChatRoomId(response.data.id);
      console.log("Works");
    } catch (error) {
      console.log("Error creating chat room:", error);
    }
  };

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef<HTMLDivElement>(null);
    useEffect(() => elementRef.current?.scrollIntoView());
    return <div ref={elementRef} />;
  };

=======
  // const AlwaysScrollToBottom = () => {
  //   const elementRef = useRef<HTMLDivElement>(null);
  //   useEffect(() => elementRef.current?.scrollIntoView(), [messages]);
  //   return <div ref={elementRef} />;
  // };
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check if the user is at or near the bottom of the chat
  const isUserNearBottom = () => {
    if (!containerRef.current) return false;
    const { scrollHeight, scrollTop, clientHeight } = containerRef.current;
    const threshold = 200; // Number of pixels from the bottom
    return scrollHeight - scrollTop <= clientHeight + threshold;
  };
  
  useEffect(() => {
    // Only scroll to the bottom if it's the initial load
    if (!hasInitialLoad && messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
      setHasInitialLoad(true); // Mark that the initial load has occurred
    }

    // If you still want to scroll when the user is near the bottom after the initial load
    if (hasInitialLoad && isUserNearBottom()) {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);
  const memoizedMessagesList = useMemo(() => {
    const messagesToDisplay = messages.map(
      (chatMessage: Message, index: number) => {
        return (
          <ChatListItem
            key={chatMessage.id}
            message={chatMessage.content}
            timestamp={chatMessage.created_at}
            isNotMyself={chatMessage.sender_id !== userId}
            opponentUserImg={opponentUser?.profile}
          />
        );
      }
    );
    return messagesToDisplay;
  }, [messages, userId]);

>>>>>>> 6853ce97dbdee67d867406f2d7d8bd10eb7224ec
  return (
    <Flex
      w="100%"
      h="70%"
      overflowY="scroll"
      flexDirection="column"
      p="3"
      ref={containerRef}
    >
      {memoizedMessagesList}
      {isLoadingChatBotMessages && <ChatBotLoadingMessage />}
      {/* <AlwaysScrollToBottom /> */}
      <div ref={messagesEndRef} style={{ height: "1px" }} />
    </Flex>
  );
};

export default Messages;
