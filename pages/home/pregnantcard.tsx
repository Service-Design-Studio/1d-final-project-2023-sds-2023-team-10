import React, { useState } from "react";
import { Box, Text, Image, VStack } from "@chakra-ui/react";
import { descriptions } from "./pregnantCardDescription";

function PregnantCard({ week, imageUrl }: any) {
  const [expanded, setExpanded] = useState(false);

  const body = descriptions["firstTrimester"];
  const handleClick = () => {
    console.log("clicked");
    setExpanded(!expanded);
  };

  return (
    <Box
      bgGradient={`linear(to-br, purple.500, pink.500)`}
      p={2}
      display="flex"
      borderRadius="lg"
      boxShadow="lg"
      textColor="white"
      cursor="pointer"
      onClick={handleClick}
      zIndex={20}
      h={expanded ? "-webkit-fit-content" : "150"} // adjusts the height based on whether the card is expanded\
      className={`${expanded ? "items-start" : "items-center"}`}
    >
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
      <VStack className="flex flex-col w-2/3" align="start">
        <Text fontSize="sm" fontWeight="bold">
          Week {week} Pregnancy
        </Text>
        <Text fontSize="xs">
          {expanded ? body : `${body.substring(0, 80)}...`}
        </Text>
        {!expanded && <Text fontSize="xs">{`See more`}</Text>}
      </VStack>
    </Box>
  );
}

export default PregnantCard;
