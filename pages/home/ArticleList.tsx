import React, { useEffect, useState } from "react";
import { Article } from "../../types";
import axios from "axios";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";

const handleUrlButton = (url: string) => {
  window.open(url, "_blank");
};

const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchArticles();

    console.log("articles", articles);

    return () => {
      setArticles([]);
    };
  }, []);

  const fetchArticles = async () => {
    setIsLoading(true);
    const createArticleResponse = await axios.get("/api/home", {
      headers: {
        accept: "application/json",
      },
    });

    const fetchedArticles = createArticleResponse.data.map(
      (article: Article) => {
        return {
          ...article,
          published_date: new Date(article.published_date),
          created_date: new Date(article.created_date),
        };
      }
    );
    setTimeout(() => {
      console.log("test");
      setArticles(fetchedArticles);
      setIsLoading(false);
    }, 1000);
    setArticles(fetchedArticles);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <Spinner size="large" />
          <h1 className="text-4xl">Loading articles...</h1>
        </div>
      </div>
    );
  }

  // Create a function to render the articles as a list of Card components.
  const renderArticles = () => {
    return articles.map((article) => (
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src={article.img_url}
          alt={article.title}
        />

        <Stack>
          <CardBody>
            <Heading size="md">{article.title}</Heading>
            <Text py="2">{article.author}</Text>
            <Text py="2">{article.published_date.toLocaleDateString()}</Text>
          </CardBody>

          <CardFooter>
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={() => handleUrlButton(article.url)}
            >
              Read Article
            </Button>
          </CardFooter>
        </Stack>
      </Card>
    ));
  };

  return (
    <>
      <div>ArticleList</div>
      <div>{renderArticles()}</div>
    </>
  );
};

export default ArticleList;
