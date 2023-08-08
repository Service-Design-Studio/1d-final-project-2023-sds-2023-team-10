import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  List,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";

type DataUsagePanelProps = {
  handleBackButtonPressed: () => void;
};

const HelpPanel: React.FC<DataUsagePanelProps> = ({
  handleBackButtonPressed,
}) => {
  return (
    <Flex direction="column" align="center">
      <Box width={"80%"}>
        <Flex direction="row" align="center" justifyContent={"space-between"}>
          <ChevronLeftIcon onClick={handleBackButtonPressed} boxSize={6} />
          <Text fontSize={"2xl"} ml="2">
            Help
          </Text>
          {/* // Empty box to keep the title centered */}
          <Box boxSize={6}></Box>
        </Flex>
        <Box p="4" width="80%" maxW="400px">
          <VStack justify="start" align="left">
            <Text fontWeight="bold">Last Updated: 13/07/2023</Text>
            <Text>
              At The Guiding Hand, we're here to support you every step of the
              way. Whether you're a teenager dealing with an unplanned pregnancy
              or someone seeking assistance from our community of counselors,
              this page is your guide. Below, you'll find links to social
              service agencies, women's groups, and instructions to navigate
              through our app.
            </Text>
            <Text fontSize={"2xl"} ml="2">
              Teenage Pregnancies
            </Text>
            <Text>
              If you are a teenager dealing with an unplanned pregnancy, you are
              not alone. Support and assistance are available through the
              following agencies in Singapore:
            </Text>
            <List>
              <a href="https://www.babes.org.sg/">
                <Text decoration={"underline"}>1. Babes</Text>
                <Text>Providing support for teenage mothers.</Text>
              </a>
              <a href="https://www.fycs.org/">
                <Text decoration={"underline"}>
                  2. Fei Yue Community Services
                </Text>
                <Text>
                  Offering counseling and assistance to young parents.
                </Text>
              </a>
            </List>
            <Text fontSize={"2xl"} ml="2">
              Women's Support Groups
            </Text>
            <Text>
              For additional support and resources, please refer to the
              following organizations:
            </Text>
            <List>
              <a href="https://www.aware.org.sg/">
                <Text decoration={"underline"}>1. AWARE</Text>
                <Text>
                  Advocacy and support for women's rights and gender equality.
                </Text>
              </a>
              <a href="http://alife.org.sg/">
                <Text decoration={"underline"}>
                  2. A Life Community Services
                </Text>
                <Text>
                  Assistance and guidance for various women's issues, including
                  unplanned pregnancies.
                </Text>
              </a>
            </List>{" "}
            <Text fontSize={"2xl"} ml="2">
              Using The Guiding Hand
            </Text>
            <Text>
              If you're new to our app or need guidance, here are some common
              areas where you might need help:
            </Text>
            <Heading fontSize={"lg"} mt="2">
              For Teenagers
            </Heading>
            <UnorderedList>
              <ListItem>
                Finding a Counselor: Use our search function to find counselors
                specializing in teenage pregnancies.
              </ListItem>
              <ListItem>
                Booking an Appointment: Click the "Book Now" button to book.
              </ListItem>
              <ListItem>
                Community Support: Join our community forums to connect with
                others.
              </ListItem>
            </UnorderedList>
            <Heading fontSize={"lg"} mt="2">
              For Counselors
            </Heading>
            <UnorderedList>
              <ListItem>
                Creating a Profile: Click "Sign Up" to create a profile.
              </ListItem>
              <ListItem>
                Connecting with Clients: Easily connect with teenagers.
              </ListItem>
              <ListItem>
                Managing Appointments: View and manage appointments in the
                dashboard.
              </ListItem>
            </UnorderedList>
            <Heading fontSize={"lg"} mt="2">
              FAQs
            </Heading>
            <Text>
              <b>Q:</b> Is my information confidential?
            </Text>
            <Text>
              <b>A:</b> Yes. Read our{" "}
              <Link href="/profile" textDecoration={"underline"}>
                Privacy Policy
              </Link>{" "}
              for more information.
            </Text>
            <Heading fontSize={"lg"} mt="2">
              Need Further Assistance?
            </Heading>
            <Text>
              Our support team is here to help.{" "}
              <Link href="/messages" textDecoration={"underline"}>
                Contact Us
              </Link>{" "}
            </Text>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
};

export default HelpPanel;
