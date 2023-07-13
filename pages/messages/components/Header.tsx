import React from "react";
import { Flex, Avatar, AvatarBadge, Text } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import Link from "next/link";

type HeaderProps = {
  onBackButtonPressed: () => void;
};

const Header: React.FC<HeaderProps> = ({ onBackButtonPressed }) => {
  return (
    <Flex w="100%">
      <Link href="/messages">
        <ChevronLeftIcon
          w={10}
          h={10}
          onClick={() => onBackButtonPressed()}
          cursor={"pointer"}
        />
      </Link>
      <Avatar size="lg" name="Dan Abrahmov" src="https://bit.ly/dan-abramov">
        <AvatarBadge boxSize="1.25em" bg="green.500" />
      </Avatar>
      <Flex flexDirection="column" mx="5" justify="center">
        <Text fontSize="lg" fontWeight="bold">
          Ferin Patel
        </Text>
        <Text color="green.500">Online</Text>
      </Flex>
    </Flex>
  );
};

export default Header;
