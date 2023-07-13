import {
  Text,
  Img,
  FormControl,
  FormLabel,
  Input,
  Box,
  Center,
  Button,
  useToast,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "../axiosFrontend";
import { useRouter } from "next/router";
import { useUser } from "@/components/UserContext";
import Link from "next/link";

const Signup = () => {
  const { logIn, isLoading } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const toast = useToast();

  const handleSignup = async () => {
    try {
      const response = await axios.post("/api/signup", {
        email,
        password,
      });

      const token = response.data.token;
      const userId = response.data.userId;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      // Log in the user
      await logIn(email, password);

      toast({
        title: "Signup Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Redirect to the home page
      router.push("/");
    } catch (error: any) {
      toast({
        title: "Error Signing Up",
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
              onClick={handleSignup}
              isLoading={isLoading}
            >
              Signup
            </Button>
            <Link href="/login">
              <Text textDecoration={"underline"}>Or login now!</Text>
            </Link>
          </Stack>
        </Center>
      </Box>
    </Center>
  );
};

export default Signup;
