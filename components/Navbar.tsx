import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import {
  EmailIcon,
  DragHandleIcon,
  InfoIcon,
  ChatIcon,
} from "@chakra-ui/icons";
import { RiHomeFill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";

const Navbar = ({ active, children, onNavClick }: any) => {
  return (
    <Box>
      {/* Top Navbar */}
      <Box bg="purple.500" w="100%" p={4} color="white" display={"fixed"}>
        <Text fontSize="lg" fontWeight="bold" textAlign="center">
          Guiding Hand
        </Text>
      </Box>
      {children}
      {/* Space under children so that the navbar doesnt block the last article */}
      <Box marginBottom={275}></Box>

      {/* Bottom Navbar */}
      <div className="fixed" style={{ minWidth: "345px", top: "625px" }}>
        <Flex
          bottom="0"
          bg="white"
          w="100%"
          borderTop="1px"
          borderColor="gray.200"
          borderRadius={25}
          boxShadow={"2xl"}
          p={3}
          justifyContent="space-around"
        >
          <NavItem
            icon={<ChatIcon boxSize={6} />}
            active={active === "messages"}
            onClick={() => onNavClick("messages")}
          />
          <NavItem
            icon={<Icon as={RiHomeFill} boxSize={6} />}
            active={active === "home"}
            onClick={() => onNavClick("home")}
          />
          <NavItem
            icon={<Icon as={FaUserAlt} boxSize={6} />}
            active={active === "profile"}
            onClick={() => onNavClick("profile")}
          />
        </Flex>
      </div>
    </Box>
  );
};

const NavItem = ({ icon, active, onClick }: any) => {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      color={active ? "purple.500" : "gray.500"}
      border={active ? "2px" : "1px"}
      borderColor={active ? "purple.500" : "gray.500"}
      rounded="full"
      p={2}
      onClick={onClick}
      cursor="pointer"
    >
      {icon}
    </Flex>
  );
};

export default Navbar;
