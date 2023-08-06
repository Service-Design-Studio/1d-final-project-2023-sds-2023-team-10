import { ChatRoom, User } from "@/types";
import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Avatar,
  AvatarBadge,
  Badge,
  Box,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export const chatbotAvatarUrl =
  "https://pixabay.com/get/gcacfd53f4c3dde57c4d9de8b07c35d2eccafbe532eb82c44d85a69ac52ff778b7f9f0531cf2c3bc68390dc0ed586d9ab48850c3a03c8c92e6bb8512a53ae456fb456b6b80aaaea8ae374141526d8bd05_1280.png?attachment=";
export const defaultAvatarUrl =
  "https://s3.eu-central-1.amazonaws.com/uploads.mangoweb.org/shared-prod/visegradfund.org/uploads/2021/03/depositphotos_121233300-stock-illustration-female-default-avatar-gray-profile.jpg";

type ChatroomRowProps = {
  id: number;
  opponentFirstName: string;
  opponentSecondName: string;
  opponentPicture: string;
  lastMessage: string;
  unreadMessagesCount: number;
  selected: boolean;
  onClick: () => void;
};

const ChatroomRow: React.FC<ChatroomRowProps> = ({
  opponentFirstName,
  opponentSecondName,
  opponentPicture,
  lastMessage,
  unreadMessagesCount,
  selected,
  onClick,
}) => {
  return (
    <ListItem
      cursor="pointer"
      _hover={{ bg: "pink.100" }}
      bg={selected ? "pink.300" : ""}
      onClick={onClick}
      p={4}
    >
      <Box display="flex" alignItems="center">
        <Avatar src={opponentPicture || defaultAvatarUrl} size="lg">
          {opponentFirstName === "Chatbot" && (
            <AvatarBadge boxSize="1.25em" bg="green.500" />
          )}
        </Avatar>
        <Box ml={3}>
          <Text as="b">{`${opponentFirstName} ${opponentSecondName}`}</Text>
          <Text mt={1}>{lastMessage}</Text>
        </Box>
        {/* {unreadMessagesCount > 0 && (
          <Badge ml="auto" colorScheme="green">
            {unreadMessagesCount}
          </Badge>
        )} */}
      </Box>
    </ListItem>
  );
};

type ContactPanelProps = {
  chatrooms: ChatRoom[];
  setSelectedChatId: (id: number) => void;
  selectedChatId: number | undefined;
};

const ContactPanel: React.FC<ContactPanelProps> = ({
  chatrooms,
  setSelectedChatId,
  selectedChatId,
}) => {
  const [backColor, setbackColor] = useState<string>("");
  if (chatrooms.length === 0) {
    return (
      <Box className="flex h-screen w-full items-center justify-center">
        <Box className="flex flex-col items-center justify-center">
          <Text as={"h1"} fontSize={"2xl"}>
            You have no chats yet.
          </Text>
        </Box>
      </Box>
    );
  }
  return (
    <Box overflowY="scroll" h="800px" w="100%">
      <List spacing={4}>
        {chatrooms.map((chatroom) => {
          // chatbot row
          if (chatroom.is_ai_chat === true) {
            return (
              <ChatroomRow
                id={chatroom.id}
                opponentFirstName={"Chatbot"}
                opponentSecondName={""}
                opponentPicture={chatbotAvatarUrl}
                lastMessage={chatroom.last_message?.content || ""}
                unreadMessagesCount={chatroom.unread_messages_count}
                selected={chatroom.id === selectedChatId}
                onClick={() => {
                  setbackColor("pink.300");
                  setTimeout(() => {
                    setbackColor("purple.100");
                    setSelectedChatId(chatroom.id);
                  }, 200);
                }}
              />
            );
          } // Skip if the other user is AI
          if (chatroom.opponent_user_type === "admin") {
            return (
              <ChatroomRow
                id={chatroom.id}
                opponentFirstName={
                  chatroom.opponent_first_name || `Guest user ${chatroom.id}`
                }
                opponentSecondName={chatroom.opponent_second_name || ""}
                opponentPicture={chatroom.opponent_picture}
                lastMessage={chatroom.last_message?.content || ""}
                unreadMessagesCount={chatroom.unread_messages_count}
                selected={chatroom.id === selectedChatId}
                onClick={() => {
                  setbackColor("pink.300");
                  setTimeout(() => {
                    setbackColor("purple.100");
                    setSelectedChatId(chatroom.id);
                  }, 200);
                }}
              />
            );
          } // Skip if the other user is not an admin
        })}
      </List>
    </Box>
  );
};

export default ContactPanel;
