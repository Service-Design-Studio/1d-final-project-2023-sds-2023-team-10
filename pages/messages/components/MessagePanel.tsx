import React from "react";

type MessagePanelProps = {
  selectedChatId: number;
};

const MessagePanel: React.FC<MessagePanelProps> = ({ selectedChatId }) => {
  return <div>MessagePanel: Selected chat is {selectedChatId}</div>;
};

export default MessagePanel;
