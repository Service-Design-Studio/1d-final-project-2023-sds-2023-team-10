import React, { useState } from "react";
import { Box, Text, Image, VStack, Collapse } from "@chakra-ui/react";
import { descriptions } from "./pregnantCardDescription";

function PregnantCard({ week, imageUrl }: any) {
  const [expanded, setExpanded] = useState(false);

  const body = descriptions["firstTrimester"];
  const handleClick = () => {
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
      // className={`${expanded ? "items-start" : "items-center"}`}
      // h={expanded ? "-webkit-fit-content" : "150"} // adjusts the height based on whether the card is expanded\
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
          maxH={130}
          maxW={130}
        />
      </Box>
      <VStack align="start" className="flex flex-col w-2/3">
        <Collapse startingHeight={130} in={expanded}>
          <Text fontSize="md" fontWeight="bold">
            Week {week} Pregnancy
          </Text>
          <Text fontSize="xs" textAlign={"justify"} className="py-4">
            {body}
          </Text>
        </Collapse>
        {!expanded && <Text fontSize="xs">{`See more...`}</Text>}
      </VStack>
    </Box>
  );
}

export default PregnantCard;
