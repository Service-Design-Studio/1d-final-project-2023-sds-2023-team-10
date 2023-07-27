import React, { useEffect, useRef } from "react";
import { Avatar, Flex, Text } from "@chakra-ui/react";
import { Message, User } from "@/types";
import useUser from "@/components/useUser";
import { defaultAvatarUrl } from "./ContactPanel";
import axios from "axios";

type MessagesProps = {
  messages: Message[];
  opponentUser: User | undefined;
};

const Messages: React.FC<MessagesProps> = ({ messages, opponentUser }) => {
  const [user, isLoadingUser] = useUser();
  const userId = user?.id;
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef<HTMLDivElement>(null);
    useEffect(() => elementRef.current?.scrollIntoView());
    return <div ref={elementRef} />;
  };

  return (
    <Flex w="100%" h="70%" overflowY="scroll" flexDirection="column" p="3">
      {messages.map((item, index) => {
        if (item.sender_id === userId) {
          return (
            <Flex key={index} w="100%" justify="flex-end">
              <Flex
                bg="#BB6192"
                color="white"
                minW="30px"
                maxW="350px"
                my="1"
                p="3"
                borderRadius="20px"
              >
                <Text>{item.content}</Text>
              </Flex>
            </Flex>
          );
        } else {
          return (
            <Flex key={index} w="100%">
              <Avatar
                name="Computer"
                src={
                  opponentUser?.profile
                    ? opponentUser?.profile
                    : defaultAvatarUrl
                }
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
                <Text>{item.content}</Text>
              </Flex>
            </Flex>
          );
        }
      })}
      <AlwaysScrollToBottom />
    </Flex>
  );
};

export default Messages;
