// components/AddChatModal.tsx
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
  Text,
  Stack,
} from "@chakra-ui/react";

import axios from "../../axiosFrontend";
import { ChatRoom, ChatRoomBeforeSend, User } from "@/types";
import useUser from "@/components/useUser";
import { ADMIN_USER_ID } from "../index.page";
import ChatProfile from "./ChatProfile";

const adminListDescriptions: { [key: number]: string } = {
  0: "Chatbot: I am a chatbot. I am here to help you with your pregnancy related questions and direct you to the right resources.",
  1: "I'm Joseph, the Admin of Guiding Hands. I'm here to help you with your pregnancy related questions and direct you to the right resources.",
  2: "I'm Sarah, a dedicated counselor at a Social Service Agency, where I  assist and guide women undergoing unplanned pregnancies towards making informed decisions",
};

type AddChatModalProps = {
  isOpen: boolean;
  onClose: () => void;
  setSelectedChatId: (id: number) => void;
  setChatRooms: Dispatch<SetStateAction<ChatRoom[]>>;
};

const AddChatModal: React.FC<AddChatModalProps> = ({
  isOpen,
  onClose,
  setSelectedChatId,
  setChatRooms,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const toast = useToast();
  const [user, isLoadingUser] = useUser();
  const [chatReady, setChatReady] = useState(false);
  const [selectedID, setSelectedID] = useState(0);

  const AdminListItem: React.FC<{ adminId: number }> = ({ adminId }) => {
    return (
      <Stack>
        <Text>{adminListDescriptions[adminId]}</Text>
        <Button onClick={() => displayProfile(adminId)}>chat</Button>
      </Stack>
    );
  };

  useEffect(() => {
    // Fetch all users when the Modal opens
    if (isOpen) {
      const fetchUsers = async () => {
        try {
          const response = await axios.get("/api/users/"); // change this URL to where your API serves a list of all users
          setUsers(response.data);
        } catch (err) {}
      };
      fetchUsers();
    }
  }, [isOpen]);

  const displayProfile = async (userID: number) => {
    setSelectedID(userID);
    setChatReady(true);
    onClose();

    //handleStartChat(userID)
  };

  const handleChatButtonClick = () => {
    setChatReady(false);
    handleStartChat(selectedID);
  };

  const handleBackClick = () => {
    setChatReady(false);
    console.log("BACK");
  };

  const handleStartChat = async (userId: number) => {
    // your code to start a chat with the selected user
    if (userId === 0) {
      // chat with bot

      // AI CHATBOT create a new chatroom with the bot here,
      const newChatbotChatRoom: ChatRoomBeforeSend = {
        // No matter what, we will always start a chat with the admin with user id 1
        user1_id: user!.id,
        // user1_id: userId,
        user2_id: -1,
        date_created: new Date().toISOString(),
        is_ai_chat: true,
        is_group_chat: false,
        overall_sentiment_analysis_score: 0,
      };
      try {
        const response = await axios.post(
          "/api/chat_rooms/",
          newChatbotChatRoom,
          {
            // NEW: added this to the axios request to pass in the query params
            params: {
              ai: "true",
            },
          }
        );
        console.log("new chatroom created sucessfully", response.data);
        setChatRooms((prevChatRooms: ChatRoomBeforeSend[]) => [
          ...prevChatRooms,
          response.data,
        ]);
        setSelectedChatId(response.data.id);
        // return response.data;
      } catch (err: any) {
        toast({
          title: "Could not start chatbot chatroom with user",
          description: err?.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      const newChatRoom: ChatRoomBeforeSend = {
        // No matter what, we will always start a chat with the admin with user id 1 or 2
        user1_id: userId === 1 ? ADMIN_USER_ID : 2,
        // user1_id: userId,
        user2_id: user!.id,
        date_created: new Date().toISOString(),
        is_ai_chat: false,
        is_group_chat: false,
        overall_sentiment_analysis_score: 0,
      };
      try {
        const response = await axios.post("/api/chat_rooms/", newChatRoom);
        console.log("new chatroom created sucessfully", response.data);
        setChatRooms((prevChatRooms: ChatRoomBeforeSend[]) => [
          ...prevChatRooms,
          response.data,
        ]);
        setSelectedChatId(response.data.id);
        // return response.data;
      } catch (err: any) {
        toast({
          title: "Could not start chat with user",
          description: err?.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }

    onClose();
  };

  return (
    <>
      {chatReady && (
        <ChatProfile
          userId={selectedID}
          onChatButtonClick={handleChatButtonClick}
          onBackButtonClick={handleBackClick}
        />
      )}
      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Select a user to start a chat</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                {/* <Stack key={0}>
                  <Text>
                    Chatbot: I am a chatbot. I am here to help you with your
                    pregnancy related questions and direct you to the right
                    resources.
                  </Text>
                  <Button onClick={() => handleStartChat(2)}>chat</Button>
                </Stack> */}
                <AdminListItem adminId={0} />
                {users.map((user) =>
                  user.user_type === "admin" ? (
                    <AdminListItem adminId={user.id} />
                  ) : // <Stack key={user.id}>
                  //   <Text>
                  //     I'm Sarah, a dedicated counselor at a Social Service
                  //     Agency, where I assist and guide women undergoing
                  //     unplanned pregnancies towards making informed decisions
                  //   </Text>
                  //   <Button onClick={() => displayProfile(user.id)}>
                  //     chat
                  //   </Button>
                  // </Stack>
                  null
                )}
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button bg={"brand.primary"} color={"white"} onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default AddChatModal;
