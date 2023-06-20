import "@/styles/globals.css";
import type { AppProps } from "next/app";
import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";

// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react";

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
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <div
        className="mx-auto p-4 bg-gray-100 border-2 border-gray-500"
        style={{ maxWidth: "375px", minHeight: "812px" }}
      >
        <Component {...pageProps} />
      </div>
    </ChakraProvider>
  );
}
