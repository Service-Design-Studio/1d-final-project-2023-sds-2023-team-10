import React, { useState } from "react";
import { Box, Text, Image, VStack } from "@chakra-ui/react";

function PregnantCard({ week, imageUrl, body }: any) {
  const [expanded, setExpanded] = useState(false);
  return (
    <Box
      bg="pink.300"
      p={2}
      display="flex"
      alignItems="center"
      borderRadius="lg"
      boxShadow="lg"
      textColor="white"
      cursor={"pointer"}
    >
      <div className="flex w-1/3 aspect-square items-center mr-2 py-1">
        <Image
          src={imageUrl}
          alt={`Week ${week} Pregnancy`}
          borderRadius="full"
          objectFit="cover"
          aspectRatio={1 / 1}
          mx="auto"
          w="80%"
        />
      </div>
      <div className="flex flex-col w-2/3">
        <Text fontSize="sm" fontWeight="bold">
          Week {week} Pregnancy
        </Text>
        <Text>{body}</Text>
      </div>
    </Box>
  );
}

export default PregnantCard;
