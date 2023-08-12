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
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputMessage.trim().length > 0) {
      handleSendMessage(); // Call handleSendMessage only when Enter key is pressed and inputMessage is not empty
    }
  };

  return (
    <Flex w="100%" mt="5" mb="70px">
      <Input
        placeholder="Type Something..."
        border="none"
        borderRadius="none"
        _focus={{
          border: "1px solid black",
        }}
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyPress={handleKeyPress} // Attach the handleKeyPress event handler here
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
        onClick={handleSendMessage} // Call handleSendMessage when the send button is clicked
      >
        <ChevronRightIcon color="#BB6192" boxSize={8} />
      </Button>
    </Flex>
  );
};

export default Footer;
