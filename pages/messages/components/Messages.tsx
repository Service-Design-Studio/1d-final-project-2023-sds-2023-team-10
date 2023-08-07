import React, { useEffect, useMemo, useRef } from "react";
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
  const userId = user?.id;
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef<HTMLDivElement>(null);
    useEffect(() => elementRef.current?.scrollIntoView(), [messages]);
    return <div ref={elementRef} />;
  };

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
    <Flex w="100%" h="70%" overflowY="scroll" flexDirection="column" p="3">
      {memoizedMessagesList}
      {isLoadingChatBotMessages && <ChatBotLoadingMessage />}
      <AlwaysScrollToBottom />
    </Flex>
  );
};

export default Messages;
