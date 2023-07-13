import { useUser } from "@/components/UserContext";
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
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";

const Login = () => {
  const { logIn, isLoading } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleLogin = async () => {
    try {
      await logIn(email, password);
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "Error Logging In",
        description: error?.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
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
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormControl>
        <FormControl id="password" mb={6}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormControl>
        <Center>
          <Button
            colorScheme="blue"
            width="full"
            onClick={handleLogin}
            isLoading={isLoading}
          >
            Submit
          </Button>
          Or <Link href="/login">signup now!</Link>
        </Center>
      </Box>
    </Center>
  );
};

export default Login;
