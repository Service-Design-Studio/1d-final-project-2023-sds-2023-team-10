import React from "react";
import MessagesBar from "./MessageBar";

before(() => {
  cy.window().then((win) => {
    win.localStorage.setItem(
      "token",
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjIwMDcxMDI1OTJ9.cecgIrFMU1o4KhkPGMj7OfYgh7ATCypH_dU4TYE6TBM"
    );
  });
});

describe("<MessagesBar />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<MessagesBar />);
  });
  it("display the correct message bar", () => {
    // see: https://on.cypress.io/mounting-react
    return true;
  });
  it("there are messages from client", () => {
    // see: https://on.cypress.io/mounting-react
    return true;
  });
  it("there is a textbox in the bottom", () => {
    // see: https://on.cypress.io/mounting-react
    return true;
  });
  it("text box is editable", () => {
    // see: https://on.cypress.io/mounting-react
    return true;
  });
  it("submit button does not return error notification", () => {
    // see: https://on.cypress.io/mounting-react
    return true;
  });
});
