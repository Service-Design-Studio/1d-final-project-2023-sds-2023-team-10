// ChatProfile.tsx
import React from 'react';
import { FaUser, FaArrowLeft } from 'react-icons/fa';
import { IconButton } from '@chakra-ui/react';
import styles from './profilepage.module.css'; // Import the CSS module

interface UserProfile {
  name: string;
  bio: string;
}

interface ChatProfileProps {
  onChatButtonClick: () => void;
  onBackButtonClick: () => void;
}

const user: UserProfile = {
  name: 'Sarah',
  bio: 'Hello, I am a counselor from Guiding Hand!',
};

const ChatProfile: React.FC<ChatProfileProps> = ({ onChatButtonClick, onBackButtonClick }) => {
    return (
      <div className={styles['profile-container']}>
        <div className={styles['back-button-container']}>
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
        <div className={styles['user-icon']}>
          <FaUser size={80} />
        </div>
        <div className={styles['user-details']}>
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </div>
        <button className={styles['chat-button']} onClick={onChatButtonClick}>
          CHAT NOW
        </button>
      </div>
    );
  };
  

export default ChatProfile;
