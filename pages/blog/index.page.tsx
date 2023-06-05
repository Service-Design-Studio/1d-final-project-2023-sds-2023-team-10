import { Box, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box className="h-screen flex items-center justify-center bg-gray-100">
      <Text fontSize="6xl" className="text-blue-500">
        Hello, World!
      </Text>
    </Box>
  );
}
