import { ConfigProvider } from "antd";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "BB6192",
        },
      }}
    >
      <Html lang="en">
        <Head />
        <body style={{ margin: 0, padding: 0 }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    </ConfigProvider>
  );
}
