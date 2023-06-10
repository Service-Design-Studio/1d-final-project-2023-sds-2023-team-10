import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

const Footer = () => {
  return (
    <Flex p="4" color="white" alignItems="center" bg="#063229">
      <Text>© All rights reserved by Memorylane.</Text>
      <Box flex="1" />
      <Flex>
        <Link href="/get-the-app">
          <Button
            colorScheme="gray"
            variant="ghost"
            mr="4"
            color="white"
            bg="transparent"
            _hover={{ bg: "transparent" }}
          >
            Get the app
          </Button>
        </Link>
        <Link href="/about">
          <Button
            colorScheme="gray"
            variant="ghost"
            mr="4"
            color="white"
            bg="transparent"
            _hover={{ bg: "transparent" }}
          >
            About Us
          </Button>
        </Link>
        <Link href="/contact-us">
          <Button
            colorScheme="gray"
            variant="ghost"
            color="white"
            bg="transparent"
            _hover={{ bg: "transparent" }}
          >
            Contact Us
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Footer;
