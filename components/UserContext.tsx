import React, { createContext, useState, useContext } from "react";
import axios from "axios";

interface User {
  userId: number;
}

interface UserContextValue {
  user: User | null;
  isLoading: boolean;
  logIn: (email: string, password: string) => Promise<void>;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      setUser({ userId: response.data.user_id });
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

  return (
    <UserContext.Provider value={{ user, logIn, isLoading }}>
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
