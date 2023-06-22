import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Navbar from "./Navbar";

export default function AppLayout({ children }: any) {
  const router = useRouter();

  const handleNavClick = (page: string) => {
    router.push(`/${page}`);
  };
  return (
    <Box maxW="375px" mx="auto" px={3} backgroundColor="blackAlpha.25">
      <Navbar active={router.pathname.slice(1)} onNavClick={handleNavClick}>
        <div className="py-5" style={{ minHeight: "545px" }}>
          {children}
        </div>
      </Navbar>
    </Box>
  );
}
