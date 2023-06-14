import Link from "next/link";
import Image from "next/image";
import { Box, Button, Flex } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Flex
      bg="transparent"
      p="4"
      color="black"
      justify="space-between"
      alignItems="center"
    >
      <Box>
        <Link href="/">
          <Image
            src="/MemoryLane.svg"
            alt="MemoryLane"
            width={120}
            height={30}
          />
        </Link>
      </Box>
      <Box ml="auto" display={{ base: "none", md: "flex" }}>
        <Link href="/">
          <Button colorScheme="gray" variant="ghost" mr="4">
            Home
          </Button>
        </Link>
        <Link href="/blog">
          <Button colorScheme="gray" variant="ghost" mr="4">
            Blog
          </Button>
        </Link>
        <Link href="/about">
          <Button colorScheme="gray" variant="ghost" mr="4">
            About
          </Button>
        </Link>
        <Link href="/faq">
          <Button colorScheme="gray" variant="ghost" mr="4">
          </Button>
        </Link>
      </Box>
      <Box>
        <Link href="/contact-us">
          <Button colorScheme="green" bg="#063229" borderRadius="20px">
            Contact Us
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default Navbar;
