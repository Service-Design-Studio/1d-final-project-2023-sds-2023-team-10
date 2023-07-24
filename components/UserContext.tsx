import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import axios from "../src/pages/axiosFrontend";
import { BACKEND_URL } from "@/config/api";

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

// eslint-disable-next-line import/prefer-default-export
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
        `${BACKEND_URL}/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      setUserId(response.data.user_id);
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

  const fetchUser = async (userIdToFetch: number) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/users/${userIdToFetch}`);
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

  const providerValue = useMemo(() => {
    return {
      userId,
      logIn,
      isLoading,
      user,
    };
  }, [isLoading, user, userId]);

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
};

// export const useUser = (): UserContextValue => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error("useUser must be used within a UserProvider");
//   }
//   return context;
// };
