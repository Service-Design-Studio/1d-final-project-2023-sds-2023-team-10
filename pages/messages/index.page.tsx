import AppLayout from "@/components/AppLayout";
import React from "react";
import MessagePanel from "./components/MessagePanel";
import ContactPanel from "./components/ContactPanel";
export const ADMIN_USER_ID = 1;

function Messages() {
  return (
    <AppLayout>
      <ContactPanel />
    </AppLayout>
  );
}

export default Messages;
