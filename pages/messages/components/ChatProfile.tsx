// ChatProfile.tsx
import React from "react";
import { FaUser, FaArrowLeft } from "react-icons/fa";
import { IconButton } from "@chakra-ui/react";
import styles from "./profilepage.module.css"; // Import the CSS module

interface UserProfile {
  name: string;
  bio: string;
}

interface ChatProfileProps {
  userId: number;
  onChatButtonClick: () => void;
  onBackButtonClick: () => void;
}

const user0: UserProfile = {
  name: "ChatBot",
  bio: "Chatbot: I am a chatbot. I am here to help you with your pregnancy related questions and direct you to the right resources.",
};
const user1: UserProfile = {
  name: "Joseph",
  bio: "I'm Joseph, the Admin of Guiding Hands. I'm here to help you with your pregnancy related questions and direct you to the right resources.",
};
const user2: UserProfile = {
  name: "Sarah",
  bio: "I'm Sarah, a dedicated counselor at a Social Service Agency, where I  assist and guide women undergoing unplanned pregnancies towards making informed decisions",
};

const users: { [key: number]: { name: string; bio: string } } = {
  0: user0,
  1: user1,
  2: user2,
};

const ChatProfile: React.FC<ChatProfileProps> = ({
  userId,
  onChatButtonClick,
  onBackButtonClick,
}) => {
  return (
    <div className={styles["profile-container"]}>
      <div className={styles["back-button-container"]}>
        <IconButton
          icon={<FaArrowLeft />}
          onClick={() => {
            // Handle the back button click event here
            onBackButtonClick(); // Call the onBackButtonClick function
          }}
          aria-label="Back"
          variant="ghost"
          size="md"
        />
      </div>
      <div className={styles["user-icon"]}>
        <FaUser size={80} />
      </div>
      <div className={styles["user-details"]}>
        <h2>{users[userId].name}</h2>
        <p>{users[userId].bio}</p>
      </div>
      <button className={styles["chat-button"]} onClick={onChatButtonClick}>
        Start chat with {users[userId].name}
      </button>
    </div>
  );
};

export default ChatProfile;
