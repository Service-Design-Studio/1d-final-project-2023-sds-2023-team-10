import "@/styles/globals.css";
import type { AppProps } from "next/app";
import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";

// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react";
import "@fontsource/mulish"; // Defaults to weight 400
import { useRouter } from "next/router";
import { UserProvider } from "@/components/UserContext";

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
      primary: "#BB6192",
    },
  },
  fonts: {
    heading: "Mulish",
    body: "Mulish",
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  if (router.pathname === "/") {
    return <Component {...pageProps} />;
  }

  return (
    <ChakraProvider theme={theme}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ChakraProvider>
  );
}
