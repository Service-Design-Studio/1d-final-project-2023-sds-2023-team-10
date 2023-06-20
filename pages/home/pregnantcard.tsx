import React, { useState } from "react";
import { Box, Text, Image, VStack } from "@chakra-ui/react";

function PregnantCard({ week, imageUrl, body }: any) {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box
      bg="pink.300"
      p={2}
      display="flex"
      borderRadius="lg"
      boxShadow="lg"
      textColor="white"
      cursor="pointer"
      onClick={handleClick}
      h={expanded ? "250" : "100"} // adjusts the height based on whether the card is expanded\
      className={`${expanded ? "items-start" : "items-center"}`}
    >
      {!expanded && (
        <Box className={`flex w-1/3 aspect-square items-center mr-2 py-1`}>
          <Image
            src={imageUrl}
            alt={`Week ${week} Pregnancy`}
            borderRadius="full"
            objectFit="cover"
            aspectRatio={1 / 1}
            mx="auto"
            w="80%"
          />
        </Box>
      )}
      <VStack className="flex flex-col w-2/3" align="start">
        <Text fontSize="sm" fontWeight="bold">
          Week {week} Pregnancy
        </Text>
        <Text fontSize="xs">
          {expanded ? body : `${body.substring(0, 20)}...`}
        </Text>
        {!expanded && <Text fontSize="xs">{`See more`}</Text>}
      </VStack>
    </Box>
  );
}

export default PregnantCard;
