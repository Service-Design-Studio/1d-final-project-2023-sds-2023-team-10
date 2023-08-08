import React, { useEffect, useRef, useState } from "react";
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
