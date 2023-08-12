import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";

type PanelWithButtonProps = {
  handleBackButtonPressed: () => void;
};

const PanelWithButton: React.FC<PanelWithButtonProps> = ({
  handleBackButtonPressed,
}) => {
  return (
    <Flex direction="column" align="center">
      <Box width={"80%"}>
        <Flex direction="row" align="center" justifyContent={"space-between"}>
          <ChevronLeftIcon onClick={handleBackButtonPressed} boxSize={6} />
          <Text fontSize={"2xl"} ml="2">
            Privacy Policy
          </Text>
          {/* // Empty box to keep the title centered */}
          <Box boxSize={6}></Box>
        </Flex>
        <Box p="4" width="80%" maxW="400px">
          <VStack justify="start" align="left">
            <Text fontWeight="bold">Last Updated: 13/07/2023</Text>
            <Text>
              This Privacy Policy describes how we collect, use, disclose, and
              protect the personal information of our users. By using our
              [App/Website/Service], you consent to the collection and use of
              your personal information as described in this policy. 1.
              Information We Collect 1.1 Personal Information: We may collect
              personal information that you provide to us voluntarily, such as
              your name, email address, phone number, and any other information
              you choose to provide. 1.2 Usage Data: We may collect non-personal
              information about how you interact with our [App/Website/Service],
              such as your device type, browser information, IP address, pages
              visited, and actions taken within the application. 2. Use of
              Information 2.1 Providing Services: We use your personal
              information to provide and improve our [App/Website/Service]. This
              includes delivering personalized content, responding to your
              inquiries, and fulfilling your requests. 2.2 Analytics and
              Improvements: We may use your information to analyze user trends,
              track usage patterns, and improve the functionality and user
              experience of our [App/Website/Service]. 2.3 Communication: We may
              use your contact information to communicate with you regarding
              important updates, announcements, or promotions related to our
              [App/Website/Service]. 3. Information Sharing 3.1 Third-Party
              Service Providers: We may share your personal information with
              trusted third-party service providers who assist us in operating
              our business, providing services to you, or conducting
              business-related activities on our behalf. These third-party
              providers are obligated to handle your information securely and
              confidentially. 3.2 Legal Requirements: We may disclose your
              personal information if required to do so by law or in response to
              valid legal requests by public authorities (e.g., court orders,
              subpoenas). 4. Data Security We take reasonable measures to
              protect your personal information from unauthorized access, use,
              disclosure, or alteration. However, please note that no method of
              transmission over the internet or electronic storage is completely
              secure, and we cannot guarantee absolute security. 5. Children's
              Privacy Our [App/Website/Service] is not intended for use by
              individuals under the age of 13. We do not knowingly collect
              personal information from children. If we become aware that we
              have inadvertently collected personal information from a child
              under 13, we will take steps to delete such information. 6.
              Changes to this Privacy Policy We may update this Privacy Policy
              from time to time. The updated version will be indicated by the
              "Last Updated" date at the top of this policy. We encourage you to
              review this policy periodically for any changes. 7. Contact Us If
              you have any questions, concerns, or requests regarding this
              Privacy Policy or our privacy practices, please contact us at
              [email address].
            </Text>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
};

export default PanelWithButton;
