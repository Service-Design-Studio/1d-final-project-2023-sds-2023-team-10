import "@/styles/globals.css";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";

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
      <Component {...pageProps} />;
    </ConfigProvider>
  );
}
