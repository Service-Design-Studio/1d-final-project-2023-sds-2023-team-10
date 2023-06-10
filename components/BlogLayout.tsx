import { ReactNode } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface BlogLayoutProps {
  children: ReactNode;
}
const BlogLayout: React.FC<BlogLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Box
        maxW="container.md"
        mx="auto"
        py="12"
        px="4"
        style={{ minHeight: "calc(100vh - 128px)" }}
      >
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default BlogLayout;
