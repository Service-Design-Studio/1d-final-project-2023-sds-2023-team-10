import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Box,
  Card,
  VStack,
  SimpleGrid,
  CardBody,
  CardHeader,
  Heading,
  Spinner,
  Text,
  Image,
} from "@chakra-ui/react";
import BlogLayout from "../../../components/BlogLayout";
import { Highlight } from "@/types";
import Link from "next/link";

const useUserHighlights = (userId: string) => {
  const [userHighlights, setUserHighlights] = useState<Highlight[] | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      fetch(`/api/user/getUserHighlights?userId=${userId}`)
        .then((response) => response.json())
        .then((data) =>
          setUserHighlights(
            data.highlights.map(
              (item: { highlight: Highlight }) => item.highlight
            )
          )
        );
      setLoading(false);
    }
  }, [userId]);

  return {
    userHighlights,
    loading,
  };
};

const HighlightCard = ({
  highlight,
  userId,
}: {
  highlight: Highlight;
  userId: string;
}) => {
  const linkTo = `/user/${userId}/${highlight.id}`;
  return (
    <Link href={linkTo}>
      <Card cursor="pointer">
        <CardHeader padding="0">
          <Heading size="md" fontFamily="lora" fontStyle="normal">
            {highlight.title}
          </Heading>
        </CardHeader>
        <CardBody padding="0">
          <Text fontFamily="Inter" fontStyle="normal" color="gray">
            {highlight.date}
          </Text>
        </CardBody>
      </Card>
    </Link>
  );
};

export default function HighlightsPage() {
  const router = useRouter();
  console.log("test" + router.query);
  const { userId } = router.query;

  const { userHighlights, loading } = useUserHighlights(userId as string);

  if (loading || !userHighlights) {
    return (
      <Box textAlign="center" paddingTop="100px">
        <Spinner />
      </Box>
    );
  }

  console.log("userHighlights", userHighlights);

  return (
    <BlogLayout>
      <Box>
        <VStack align="flex-start">
          <Box display="flex" alignItems="center">
            <Image src="/m-book.svg" alt="book" />
            <Heading as="h1" mb="4" fontFamily="Lora" fontStyle="normal">
              Stories
            </Heading>
          </Box>
        </VStack>
        <VStack>
          <SimpleGrid columns={[1, 2]} spacing={6}>
            {userHighlights.map((highlight) => {
              return (
                <Box key={highlight.id}>
                  <HighlightCard
                    highlight={highlight}
                    userId={userId as string}
                  />
                </Box>
              );
            })}
          </SimpleGrid>
        </VStack>
      </Box>
    </BlogLayout>
  );
}
