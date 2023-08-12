import React, { useEffect, useMemo, useRef, useState } from "react";
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
