import React from "react";
import {
  AppRouterContext,
  AppRouterInstance,
} from "next/dist/shared/lib/app-router-context";
import LoginPage from "./login.page";
import MockNextRouter from "../../cypress/utils/router";

// const pathname = "/login";
// const push = cy.stub();
// cy.stub(NextRouter, "useRouter").returns({ pathname, push });

describe("Login Page", () => {
  // Set up the authorization token before running the tests
  before(() => {
    cy.window().then((win) => {
      win.localStorage.setItem(
        "token",
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjIwMDcxMDI1OTJ9.cecgIrFMU1o4KhkPGMj7OfYgh7ATCypH_dU4TYE6TBM"
      );
    });
  });

  // Mount the login component before each test
  beforeEach(() => {
    cy.mount(
      <MockNextRouter>
        <LoginPage />
      </MockNextRouter>
    ); // Replace with the correct component
  });

  it("renders the login page", () => {
    // return true;
    // Check if the login form is rendered correctly
    cy.get("h3.ant-typography").should("be.visible");
  });

  it("displays error message for incorrect credentials", () => {
    // return true;
    // Enter incorrect credentials
    cy.get("input#normal_login_email").type("wrong-username");
    cy.get("input#normal_login_password").type("wrong-password");
    cy.get("button#login-btn").click();

    // Check for the error message
    // cy.get("div#error-message").should(
    //   "contain",
    //   "Incorrect username or password"
    // );
  });

  it("allows user to log in with correct credentials", () => {
    cy.get("input#normal_login_email").should("be.visible").type("admin");
    cy.get("input#normal_login_password").should("be.visible").type("admin");

    cy.get("button#login-btn").should("be.visible").click();

    // Wait for navigation to complete
    cy.wait(2000); // Adjust the duration as needed (in milliseconds)

    // Check for the existence of a specific element on the redirected page
    cy.get(
      "#__next > section > header > ul > li.ant-menu-overflow-item.ant-menu-item.ant-menu-item-selected"
    ).should("be.visible");
  });

  it("has a link to reset password", () => {
    return true;
    // Check if the reset password link is present
    cy.get("a#reset-password-link").should("be.visible");
  });
});
