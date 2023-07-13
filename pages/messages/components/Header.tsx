import React from "react";
import { Flex, Avatar, AvatarBadge, Text } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { User } from "@/types";

type HeaderProps = {
  onBackButtonPressed: () => void;
  opponentUser: User | undefined;
};

const Header: React.FC<HeaderProps> = ({
  onBackButtonPressed,
  opponentUser,
}) => {
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
      <Avatar size="lg" name="Dan Abrahmov" src={opponentUser?.profile}>
        <AvatarBadge boxSize="1.25em" bg="green.500" />
      </Avatar>
      <Flex flexDirection="column" mx="5" justify="center">
        <Text fontSize="lg" fontWeight="bold">
          {opponentUser?.first_name + " "}
          {opponentUser?.second_name}
        </Text>
        <Text color="green.500">Online</Text>
      </Flex>
    </Flex>
  );
};

export default Header;
