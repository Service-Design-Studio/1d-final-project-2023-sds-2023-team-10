// components/AddChatModal.tsx
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  VStack,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";

import axios from "../../axiosFrontend";
import { ChatRoomBeforeSend, User } from "@/types";
import useUser from "@/components/useUser";

type AddChatModalProps = {
  isOpen: boolean;
  onClose: () => void;
  setSelectedChatId: (id: number) => void;
};

const AddChatModal: React.FC<AddChatModalProps> = ({
  isOpen,
  onClose,
  setSelectedChatId,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const toast = useToast();
  const [user, isLoadingUser] = useUser();

  useEffect(() => {
    // Fetch all users when the Modal opens
    if (isOpen) {
      const fetchUsers = async () => {
        try {
          const response = await axios.get("/api/users/"); // change this URL to where your API serves a list of all users
          setUsers(response.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchUsers();
    }
  }, [isOpen]);

  const handleStartChat = async (userId: number) => {
    // your code to start a chat with the selected user
    console.log(`Start chat with ${userId}`);
    const newChatRoom: ChatRoomBeforeSend = {
      user1_id: userId,
      user2_id: user!.id,
      date_created: new Date().toISOString(),
      is_ai_chat: false,
      is_group_chat: false,
      overall_sentiment_analysis_score: 0,
    };
    try {
      const response = await axios.post("/api/chat_rooms/", newChatRoom);
      console.log("new chatroom created sucessfully", response.data);
      setSelectedChatId(response.data.id);
      return response.data;
    } catch (err: any) {
      toast({
        title: "Could not start chat with user",
        description: err?.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select a user to start a chat</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            {users.map((user) => (
              <Button key={user.id} onClick={() => handleStartChat(user.id)}>
                {user.first_name}
              </Button>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button bg={"brand.primary"} color={"white"} onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddChatModal;
