import AppLayout from "@/components/AppLayout";
import React from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Divider,
  Switch,
  Flex,
} from "@chakra-ui/react";

function Account() {
  return (
    <AppLayout>
      <ProfilePanel />
    </AppLayout>
  );
}

function ProfilePanel() {
  const [isAnonymous, setAnonymous] = React.useState(false);

  const toggleAnonymous = () => {
    setAnonymous(!isAnonymous);
  };

  return (
    <Flex justifyContent={"center"}>
      <Box padding="5" bg="white" maxW="md" borderRadius="lg">
        <Text fontSize="2xl" mb="5">
          Sarah Wang
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
          <Text fontSize="xl">Notifications</Text>
          <Text fontSize="xl">Data Usage</Text>
          <Text fontSize="xl">Privacy Policy</Text>
          <Text fontSize="xl">Help</Text>
        </VStack>
      </Box>
      <Box marginBottom={275}></Box>
    </Flex>
  );
}

export default Account;
