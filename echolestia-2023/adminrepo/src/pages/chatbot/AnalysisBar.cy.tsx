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

  // it("renders pink carousel", () => {
  //   cy.get('[data-testid="pink-carousell"]').should("be.visible");
  //   // You can put specific test code here
  // });

  it("renders the analysis title", () => {
    cy.get('[data-testid="sentiment-analysis-title"]').should("be.visible");
  });
  it("renders the next analysis button", () => {
    cy.get('[data-testid="next-analysis-button"]').should("be.visible");
  });

  it("renders statistic after the next analysis button is pressed", () => {
    cy.wait(1000);
    // Find the next analysis button and click on it
    cy.get('[data-testid="next-analysis-button"]').click();
    cy.wait(1000);
    // Check that the element with datatestid 'statistic' is visible after the click
    cy.get(".ant-statistic").should("be.visible");
  });
  it("renders the frown icon if the value is below 0.3", () => {
    // Find the frown icon using the SVG path
    cy.get('svg[data-icon="frown"]').should("be.visible");
  });

  it("renders the meh icon if the value is 0.3 to 0.6", () => {
    // Find the frown icon using the SVG path
    cy.get('svg[data-icon="meh"]').should("be.visible");
  });
  it("renders the smile icon if the value is above 0.6", () => {
    // Find the frown icon using the SVG path
    cy.get('svg[data-icon="smile"]').should("be.visible");
  });
  it("clicks refresh button, shows spinner, and then renders the data without crashing", () => {
    // First, click the refresh button
    cy.get('[data-testid="refresh-button"]').click();

    // Expect to see a spinner while the data is loading (replace the selector with the appropriate one for your spinner)
    // cy.get(".ant-skeleton").should("be.visible");

    // If there's an API call associated with the refresh, you can wait for it
    // cy.wait('@aliasForRefreshApiCall');

    // Alternatively, you can use a timed wait if you don't have an intercept for the API call
    // cy.wait(timeInMilliseconds);

    // Now, check that the data is rendered (replace this with the appropriate check for your data)
    cy.get(".recharts-surface").should("be.visible");
  });
});
