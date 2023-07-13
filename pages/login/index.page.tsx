import {
  VStack,
  Text,
  Img,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
  Box,
  Center,
} from "@chakra-ui/react";
import React from "react";

const Login = () => {
  const handleLogin = () => {
    alert("Login");
  };

  return (
    <Center h="100vh" bg="gray.50">
      <Box maxW={"sm"} p={8} borderRadius="xl" boxShadow="lg" bg="white">
        <Center mb={6}>
          <Img
            src="\logo\Guiding hand logo-03.png"
            alt="logo"
            boxSize="100px"
          />
        </Center>
        <Text
          as={"h1"}
          mb={6}
          fontSize={"4xl"}
          textAlign="center"
          color="#BB6192"
        >
          Guiding Hand
        </Text>
        <FormControl id="email" mb={4}>
          <FormLabel>Email</FormLabel>
          <Input type="email" />
        </FormControl>
        <FormControl id="password" mb={6}>
          <FormLabel>Password</FormLabel>
          <Input type="password" />
        </FormControl>
        <Center>
          <Button colorScheme="blue" width="full" onClick={handleLogin}>
            Submit
          </Button>
        </Center>
      </Box>
    </Center>
  );
};

export default Login;
