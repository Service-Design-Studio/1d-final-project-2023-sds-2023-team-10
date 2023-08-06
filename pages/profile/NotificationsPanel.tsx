import { Box, Button, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { FaRegDotCircle } from "react-icons/fa";

type NotificationsPanelProps = {
  handleBackButtonPressed: () => void;
};

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({
  handleBackButtonPressed,
}) => {
  return (
    <Flex direction="column" align="center">
      <Box width={"80%"}>
        <Flex direction="row" align="center" justifyContent={"space-between"}>
          <ChevronLeftIcon onClick={handleBackButtonPressed} boxSize={6} />
          <Text fontSize={"2xl"} ml="2">
            Notifications
          </Text>
          {/* // Empty box to keep the title centered */}
          <Box boxSize={6}></Box>
        </Flex>
        <Box p="4" width="80%" maxW="400px" margin="0 auto">
          <VStack justify="start" align="left">
            <Text>
              Our app does not send push notifications to your device. However,
              we value your communication with the counselors.
            </Text>
            <Text>
              Whenever you have unread messages from counselors, you'll see a
              red dot indicator on the Messages tab.
            </Text>
            <Box display="flex" alignItems="center" mt="2">
              <Icon as={FaRegDotCircle} color="red.500" w={5} h={5} />
              <Text ml="2">Indicates unread messages from counselors</Text>
            </Box>
            <Text mt="4">
              Please make sure to check your messages regularly to stay up to
              date with the counselors' responses.
            </Text>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
};

export default NotificationsPanel;
