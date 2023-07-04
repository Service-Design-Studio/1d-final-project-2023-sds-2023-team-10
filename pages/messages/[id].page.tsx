import AppLayout from "@/components/AppLayout";
import React from "react";
import MessagePanel from "./components/MessagePanel";

const ChatRoom = () => {
  return (
    <AppLayout>
      <MessagePanel />
    </AppLayout>
  );
};

export default ChatRoom;
