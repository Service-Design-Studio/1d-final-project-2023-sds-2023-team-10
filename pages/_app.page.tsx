import "@/styles/globals.css";
import type { AppProps } from "next/app";
import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";

// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react";
import "@fontsource/mulish"; // Defaults to weight 400

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  colors: {
    brand: {
      100: "#f7fafc",
      // ...
      200: "#063229",
      300: "#063229",
      400: "#063229",
      500: "#0d6e5a",
      600: "#063229",
      700: "#063229",
      800: "#063229",
      900: "#063229",
    },
  },
  fonts: {
    heading: "Mulish",
    body: "Mulish",
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <div
        className="fixed mx-auto p-4 bg-gray-100  border-2 border-gray-500"
        style={{
          minWidth: "375px",
          height: "700px",
          marginLeft: "calc(50vw - 200px)",
          zIndex: "-1",
        }}
      ></div>
      <Component {...pageProps} />
      <div
        className="fixed z-50"
        style={{
          backgroundColor: "white",
          minHeight: "calc(100vh - 700px)",
          top: "700px",
          width: "100vw",
        }}
      ></div>
    </ChakraProvider>
  );
}
