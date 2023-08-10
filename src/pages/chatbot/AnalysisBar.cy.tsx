import React from "react";
import AnalysisBar from "./AnalysisBar";

describe("<AnalysisBar />", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: "/api/chat_rooms_with_messages/15",
      },
      { fixture: "chat_room_with_messages_15.json" }
    ).as("getChatRooms");

    cy.intercept(
      {
        method: "GET",
        url: "/api/users/77",
      },
      { fixture: "users_77.json" }
    ).as("getUsers"); // Note that I've changed the alias to 'getUsers' to avoid naming conflict

    cy.mount(<AnalysisBar selectedChatId="15" />);
  });

  it("renders", () => {
    // You can put specific test code here
  });

  it("renders the analysis bar", () => {
    cy.get('[data-testid="sentiment-analysis-title"]').should("be.visible");
  });
});
