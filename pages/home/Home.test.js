import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import axios from "../axiosFrontend";
import Home from "./index.page";
import { UserContext } from "../../components/UserContext";
import { useRouter } from "next/router";
import { NextRouter } from "next/dist/shared/lib/router/router";
import { RouterContext } from "next/dist/shared/lib/router-context";

jest.mock("../axiosFrontend");
jest.mock("next/router", () => require("next-router-mock"));

describe("Home component", () => {
  let mockUser;

  beforeEach(() => {
    mockUser = {
      id: "1",
      first_name: "Test",
      second_name: "User",
      pregnancy_week: "25",
    };
    useRouter.mockReturnValue({
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
    });

    axios.get.mockResolvedValueOnce({ data: mockUser });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders greeting with user name when user data is loaded", async () => {
    const contextValue = {
      userId: 1, // or some mock id
      isLoading: false,
      user: mockUser,
      logIn: jest.fn(), // mock this function as we are not testing it here
    };

    render(
      <UserContext.Provider value={contextValue}>
        <Home />
      </UserContext.Provider>
    );

    await waitFor(() => {
      expect(
        screen.getByText(
          `Hello, ${mockUser.first_name} ${mockUser.second_name}!`
        )
      ).toBeInTheDocument();
    });
  });

  test("renders pregnant card when user is pregnant", async () => {
    const contextValue = {
      userId: 1, // or some mock id
      isLoading: false,
      user: mockUser,
      logIn: jest.fn(), // mock this function as we are not testing it here
    };

    render(
      <UserContext.Provider value={contextValue}>
        <Home />
      </UserContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("pregnant-card")).toBeInTheDocument();
    });
  });

  test("renders loading spinner when user data is not yet loaded", () => {
    const contextValue = {
      userId: 1, // or some mock id
      isLoading: true,
      user: null,
      logIn: jest.fn(), // mock this function as we are not testing it here
    };

    render(
      <UserContext.Provider value={contextValue}>
        <Home />
      </UserContext.Provider>
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
