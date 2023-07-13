import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "../src/pages/axiosFrontend";

interface User {
  userId: number;
}

interface UserContextValue {
  userId: number | null;
  isLoading: boolean;
  logIn: (email: string, password: string) => Promise<void>;
  user: any;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<number | null>(() => {
    if (typeof window !== "undefined") {
      const userIdLocal = localStorage.getItem("userId");
      return userIdLocal ? Number(userIdLocal) : null;
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>();

  const logIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://rubybackend-xnabw36hha-as.a.run.app/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      setUserId(response.data.user_id);
      console.log("FETCHING USER", userId);
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        throw new Error("Invalid email/password combination");
      } else {
        throw error;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUser = async (userId: number) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/users/${userId}`);
      setUser(response.data);
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userIdLocal = localStorage.getItem("userId");
      if (userIdLocal) {
        fetchUser(Number(userIdLocal));
      } else {
        setIsLoading(false);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ userId, logIn, isLoading, user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextValue => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
