import { Box } from "@chakra-ui/react";
import React from "react";

type MessagePanelProps = {
  selectedChatId: number;
};

const MessagePanel: React.FC<MessagePanelProps> = ({ selectedChatId }) => {
  return <Box>MessagePanel: Selected chat is {selectedChatId}</Box>;
};

export default MessagePanel;
