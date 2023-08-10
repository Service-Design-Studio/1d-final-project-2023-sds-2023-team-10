import React from "react";
import ContactsBar from "./ContactsBar";

const user = {
  id: 70,
  overall_sentiment_analysis_score: 0,
  date_created: "2023-07-14T01:40:38.398Z",
  is_ai_chat: false,
  is_group_chat: false,
  user1_id: 115,
  user2_id: 77,
  created_at: "2023-07-14T01:40:38.555Z",
  updated_at: "2023-07-14T01:40:38.555Z",
  user1_first_name: "User0",
  user1_second_name: "Last0",
  user1_picture: "https://picsum.photos/200",
  unread_messages_count_user1: 0,
  user2_first_name: "string",
  user2_second_name: "string",
  user2_picture: "string",
  unread_messages_count_user2: 0,
  messages: [],
};

describe("<ContactsBar />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <ContactsBar
        selectedChatId="5"
        user={user}
        contacts={contacts}
        setSelectedChatId={setSelectedChatId}
      />
    );
  });
});
