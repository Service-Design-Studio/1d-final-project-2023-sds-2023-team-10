import React from "react";
import { Article } from "../../types";
import { Card, Stack, CardBody, Heading, Image, Text } from "@chakra-ui/react";

type RecommendedArticleProps = {
  article: Article;
  onArticleClick: (url: string) => void;
};

const RecommendedArticle: React.FC<RecommendedArticleProps> = ({
  article,
  onArticleClick,
}) => {
  if (!article) {
    return null;
  }

  return (
    <Card
      onClick={() => onArticleClick(article.url)}
      overflow="hidden"
      variant="outline"
      margin="1"
      borderRadius={20}
    >
      <Image
        objectFit="cover"
        width="100%"
        maxH="200px"
        borderRadius="20"
        src={article.img_url}
        alt={article.title}
      />
      <CardBody h={120}>
        <Stack height="100%">
          <a href={article.url}>
            <Heading size="md">{article.title}</Heading>
          </a>
          <Text py="2">{article.author}</Text>
          <Text py="2">{article.published_date.toLocaleDateString()}</Text>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default RecommendedArticle;
