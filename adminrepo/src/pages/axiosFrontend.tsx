// lib/axios.ts

import axios from "axios";

const instance = axios.create({
  baseURL: "/",
});

instance.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["Referrer-Policy"] = "no-referrer";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
