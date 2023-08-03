import AppLayout from "@/components/AppLayout";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Divider,
  Switch,
  Flex,
  Button,
} from "@chakra-ui/react";
import PrivacyPanel from "./PrivacyPanel";
import useUser from "@/components/useUser";

function Account() {
  return (
    <AppLayout>
      <ProfilePanel />
    </AppLayout>
  );
}

function ProfilePanel() {
  const [isAnonymous, setAnonymous] = React.useState(false);
  const [selected, setSelected] = useState<string>();
  const [user, isLoadingUser] = useUser();

  const toggleAnonymous = () => {
    setAnonymous(!isAnonymous);
  };
  const handleClick = (component: string) => {
    setSelected(component);
  };

  if (selected !== undefined) {
    return <DisplayComponent selected={selected} setSelected={setSelected} />;
  }

  return (
    <Flex justifyContent={"center"}>
      <Box padding="5" bg="white" maxW="md" borderRadius="lg">
        <Text fontSize="2xl" mb="5">
          {user?.first_name} {user?.second_name}
        </Text>

        <Box borderWidth={1} borderRadius="md" padding="3" bg={"gray.200"}>
          <Text fontSize="xl" mb="3">
            About Me
          </Text>
          <VStack align="start" spacing="2">
            <Text>Age: 16 years</Text>
            <Text>Marital Status: Single</Text>
            <Text>Partner: Left me</Text>
            <Text>Parents: Do not know about child</Text>
            <Text>Baby: Want to keep baby</Text>
          </VStack>

          <Divider my="5" />

          <Text fontSize="xl" mb="3">
            Pregnancy
          </Text>
          <VStack align="start" spacing="2">
            <Text>Week: 14</Text>
            <Text>Trimester: Second</Text>
          </VStack>

          <Divider my="5" />

          <Text fontSize="xl" mb="3">
            More about yourself
          </Text>
          <Text>Have financial problems and unable to care for child</Text>

          <Divider my="5" />

          <HStack justifyContent="space-between">
            <Text fontSize="xl">Anonymous</Text>
            <Switch
              colorScheme="pink"
              isChecked={isAnonymous}
              onChange={toggleAnonymous}
            />
          </HStack>
        </Box>

        <VStack align="start" spacing="5" mt="5">
          <Button variant="link" onClick={() => handleClick("notifications")}>
            Notifications
          </Button>
          <Button variant="link" onClick={() => handleClick("dataUsage")}>
            Data Usage
          </Button>
          <Button variant="link" onClick={() => handleClick("privacyPolicy")}>
            Privacy Policy
          </Button>
          <Button variant="link" onClick={() => handleClick("help")}>
            Help
          </Button>
        </VStack>
      </Box>
      <Box marginBottom={275}></Box>
    </Flex>
  );
}

const DisplayComponent = ({
  selected,
  setSelected,
}: {
  selected: string | undefined;
  setSelected: Dispatch<SetStateAction<string | undefined>>;
}) => {
  const handleBackButtonPressed = () => {
    setSelected(undefined);
  };
  switch (selected) {
    case "notifications":
      return <Box>Render notifications component here</Box>;
    case "dataUsage":
      return <Box>Render data usage component here</Box>;
    case "privacyPolicy":
      return <PrivacyPanel handleBackButtonPressed={handleBackButtonPressed} />;
    case "help":
      return <Box>Render help component here</Box>;
    default:
      return null;
  }
};

export default Account;
