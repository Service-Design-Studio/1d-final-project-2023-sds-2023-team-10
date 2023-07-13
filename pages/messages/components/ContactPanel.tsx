import { ChatRoom, User } from "@/types";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { Avatar, Badge, Box, List, ListItem, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

type ContactPanelProps = {
  chatrooms: ChatRoom[];
  chatUsers: User[];
  setSelectedChatId: (id: number) => void;
  selectedChatId: number | undefined;
};

const defaultAvatarUrl =
  "https://s3.eu-central-1.amazonaws.com/uploads.mangoweb.org/shared-prod/visegradfund.org/uploads/2021/03/depositphotos_121233300-stock-illustration-female-default-avatar-gray-profile.jpg";

const ContactPanel: React.FC<ContactPanelProps> = ({
  chatrooms,
  chatUsers,
  setSelectedChatId,
  selectedChatId,
}) => {
  const [backColor, setbackColor] = useState<string>("");

  return (
    <Box overflowY="scroll" h="800px" w="100%">
      <List spacing={4}>
        {chatrooms.map((chatroom) => {
          return (
            <ListItem
              key={chatroom.id}
              cursor="pointer"
              _hover={{ bg: "pink.100" }}
              bg={chatroom.id !== selectedChatId ? "" : backColor}
              onClick={() => {
                setbackColor("pink.300");
                setTimeout(() => {
                  setbackColor("purple.100");
                  setSelectedChatId(chatroom.id);
                }, 200);
              }}
              p={4}
            >
              <Box display="flex" alignItems="center">
                <Avatar src={chatroom.opponent_picture} size="lg" />
                <Box ml={3}>
                  <Text as="b">
                    {chatroom.opponent_first_name &&
                    chatroom.opponent_second_name
                      ? `${chatroom.opponent_first_name} ${chatroom.opponent_second_name}`
                      : `Guest user ${chatroom.id}`}
                  </Text>
                  <Text mt={1}>{chatroom.last_message?.content}</Text>
                </Box>
                {chatroom.unread_messages_count > 0 && (
                  <Badge ml="auto" colorScheme="green">
                    {chatroom.unread_messages_count}
                  </Badge>
                )}
              </Box>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default ContactPanel;
