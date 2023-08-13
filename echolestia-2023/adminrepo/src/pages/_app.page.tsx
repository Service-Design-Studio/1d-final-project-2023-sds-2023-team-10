import "@/styles/globals.css";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import { UserProvider } from "../../components/UserContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    // define theme colors here

    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#BB6192",
        },
      }}
    >
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ConfigProvider>
  );
}
