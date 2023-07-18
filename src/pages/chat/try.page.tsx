/* eslint-disable react/no-array-index-key */
import React from "react";
import useMessages from "../../../components/useMessages";

const Chat: React.FC = () => {
  const chatroomId = 1; // Replace with the actual chatroomId in your use case
  const messages = useMessages(chatroomId);

  return (
    <div>
      <h2>Messages:</h2>
      {messages.map((message, index) => (
        <p key={index}>{message.content}</p>
      ))}
    </div>
  );
};

export default Chat;
