import { useState, useEffect } from "react";
import axios from "axios";
import { User } from "../types";

const useUser = (): [User | null, string | null, boolean, () => void] => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const storedToken = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      if (storedToken) {
        const config = {
          headers: { Authorization: `Bearer ${storedToken}` },
        };

        const response = await axios.get<User>(`/api/users/${userId}`, config);
        setUser(response.data);
        setToken(storedToken); // set the token state
      }
      setLoading(false);
    };

    getUser();
  }, []);

  const clearUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUser(null);
    setToken(null);
  };

  return [user, token, loading, clearUser];
};

export default useUser;
