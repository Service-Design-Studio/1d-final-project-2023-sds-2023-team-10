import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import { EmailIcon, DragHandleIcon, InfoIcon } from "@chakra-ui/icons";

const Navbar = ({ active, children, onNavClick }: any) => {
  return (
    <Box>
      {/* Top Navbar */}
      <Box bg="purple.500" w="100%" p={4} color="white">
        <Text fontSize="lg" fontWeight="bold" textAlign="center">
          Guiding Hand
        </Text>
      </Box>
      {children}

      {/* Bottom Navbar */}
      <Flex
        bottom="0"
        bg="white"
        w="100%"
        borderTop="1px"
        borderColor="gray.200"
        p={3}
        justifyContent="space-around"
      >
        <NavItem
          icon={<EmailIcon boxSize={6} />}
          active={active === "messages"}
          onClick={() => onNavClick("messages")}
        />
        <NavItem
          icon={<DragHandleIcon boxSize={6} />}
          active={active === "home"}
          onClick={() => onNavClick("home")}
        />
        <NavItem
          icon={<InfoIcon boxSize={6} />}
          active={active === "profile"}
          onClick={() => onNavClick("profile")}
        />
      </Flex>
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
