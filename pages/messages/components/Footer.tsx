import React from "react";
import { Flex, Input, Button } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

type FooterProps = {
  inputMessage: string;
  setInputMessage: (inputMessage: string) => void;
  handleSendMessage: () => void;
};

const Footer: React.FC<FooterProps> = ({
  inputMessage,
  setInputMessage,
  handleSendMessage,
}) => {
  return (
    <Flex w="100%" mt="5">
      <Input
        placeholder="Type Something..."
        border="none"
        borderRadius="none"
        _focus={{
          border: "1px solid black",
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSendMessage();
          }
        }}
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <Button
        bg="transparent"
        color="white"
        borderRadius="none"
        _hover={{
          bg: "white",
          color: "black",
          border: "1px solid black",
        }}
        mr="5px"
        disabled={inputMessage.trim().length <= 0}
        onClick={handleSendMessage}
      >
        <ChevronRightIcon color="#BB6192" boxSize={8} />
      </Button>
    </Flex>
  );
};

export default Footer;
