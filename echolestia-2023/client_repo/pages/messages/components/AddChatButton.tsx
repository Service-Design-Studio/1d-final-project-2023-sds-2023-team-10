// components/AddChatButton.tsx
import { IconButton, Icon } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

const AddChatButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <IconButton
      aria-label="Add new chat"
      icon={<Icon as={FaPlus} />}
      isRound
      onClick={onClick}
      position="fixed"
      bottom="6em"
      right="2em"
      bg={"brand.primary"}
      color={"white"}
      size={"lg"}
      // Style the button as you like
    />
  );
};

export default AddChatButton;
