import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";

type DataUsagePanelProps = {
  handleBackButtonPressed: () => void;
};

const DataUsagePanel: React.FC<DataUsagePanelProps> = ({
  handleBackButtonPressed,
}) => {
  return (
    <Flex direction="column" align="center">
      <Box width={"80%"}>
        <Flex direction="row" align="center" justifyContent={"space-between"}>
          <ChevronLeftIcon onClick={handleBackButtonPressed} boxSize={6} />
          <Text fontSize={"2xl"} ml="2">
            Data Usage
          </Text>
          {/* // Empty box to keep the title centered */}
          <Box boxSize={6}></Box>
        </Flex>
        <Box p="4" width="80%" maxW="400px">
          <VStack justify="start" align="left">
            <Text fontWeight="bold">Last Updated: 13/07/2023</Text>
            <Text>
              At The Guiding Hand, we value your privacy and are committed to
              ensuring the highest level of protection for your personal data.
              This Data Usage Policy explains how we collect, use, and safeguard
              your information. Please read the following carefully to
              understand our practices.
            </Text>
            <Text>
              What Information We Collect We may collect and process the
              following data about you: Personal Information: Including but not
              limited to name, email address, phone number, etc. Usage
              Information: Information about how you interact with our app, such
              as the pages you visit, the time spent on those pages, etc.
              Technical Information: Device IDs, IP addresses, and other related
              details.
            </Text>
            <Text>
              How We Use Your Information We use the information we collect for
              various purposes, such as: To provide and maintain our Service To
              notify you about changes to our Service To allow you to
              participate in interactive features of our Service To provide
              customer support To gather analysis or valuable information so
              that we can improve our Service
            </Text>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
};

export default DataUsagePanel;
