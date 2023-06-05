import { ReactNode } from "react";
import { Box, Button, Flex, Heading, Spacer, Text } from "@chakra-ui/react";

interface BlogLayoutProps {
  children: ReactNode;
}

const Header = () => (
  <Flex bg="green-500" p="4" color="white" alignItems="center">
    <Heading size="md">Logo</Heading>
    <Spacer />
    <Button colorScheme="#063229" variant="ghost">
      Home
    </Button>
    <Button colorScheme="brand">Contact Us</Button>
  </Flex>
);

const Footer = () => (
  <Flex
    p="4"
    color="white"
    alignItems="center"
    style={{ backgroundColor: "#063229" }}
  >
    <Text>© 2023 Memorylane. All rights reserved.</Text>
    <Spacer />
    <Button>Contact Us</Button>
  </Flex>
);

const BlogLayout: React.FC<BlogLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
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
