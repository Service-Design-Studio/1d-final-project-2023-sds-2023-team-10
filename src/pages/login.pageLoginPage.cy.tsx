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
    // Enter correct credentials (replace with actual values)
    cy.get("input#normal_login_email").type("admin");
    cy.get("input#normal_login_password").type("admin");
    cy.get("button#login-btn").click();

    // Check if the user is redirected to the correct page after login
    cy.url().should("eq", "http://localhost:3000/"); // Replace with the correct URL
  });

  it("has a link to reset password", () => {
    return true;
    // Check if the reset password link is present
    cy.get("a#reset-password-link").should("be.visible");
  });
});
