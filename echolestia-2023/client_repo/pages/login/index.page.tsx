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
  Stack,
} from "@chakra-ui/react";
import axios from "../axiosFrontend";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Login = () => {
  const { logIn, isLoading } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      });

      const token = response.data.token;
      const userId = response.data.userId;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      await logIn(email, password);
      router.push("/home");
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
          <Stack spacing={4}>
            <Button
              bg={"brand.primary"}
              color={"white"}
              width="full"
              onClick={handleLogin}
              isLoading={isLoading}
              data-testid="login-button"
            >
              Log In
            </Button>
            <Link href="/">
              <Text textDecoration={"underline"}>Or signup now!</Text>
            </Link>
          </Stack>
        </Center>
      </Box>
    </Center>
  );
};

export default Login;
