import BlogLayout from "@/components/BlogLayout";
import { Box, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <BlogLayout>
        <Text fontSize="6xl" className="text-blue-500">
          Hello, World!
        </Text>
    </BlogLayout>
  );
}
