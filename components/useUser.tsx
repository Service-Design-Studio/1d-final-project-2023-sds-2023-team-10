// lib/useUser.tsx

import { useState, useEffect } from "react";
import axios from "axios";
import { User } from "../types";

const useUser = (): [User | null, boolean] => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      if (token) {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const response = await axios.get<User>(`/api/users/${userId}`, config);
        setUser(response.data);
      }
      setLoading(false);
    };

    getUser();
  }, []);

  return [user, loading];
};

export default useUser;
