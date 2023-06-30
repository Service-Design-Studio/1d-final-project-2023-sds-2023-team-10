import React, { useEffect, useState } from "react";
import { Article } from "../../types";
import axios from "axios";
import {
  Card,
  CardBody,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import RecommendedArticle from "./RecommendedArticle";

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
    // setArticles(fetchedArticles);
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
    return (
      <>
        <div className="flex flex-col items-center justify-center">
          {articles.map((article, index) => {
            if (index === 0) {
              return null;
            }

            return (
              <Card
                onClick={() => handleUrlButton(article.url)}
                direction="row"
                overflow="hidden"
                variant="outline"
                margin="1"
                height={120}
                borderRadius={20}
              >
                <Image
                  objectFit="cover"
                  h="100%"
                  w="120px"
                  borderRadius="20"
                  src={article.img_url}
                  alt={article.title}
                />

                <Stack height="100%">
                  <CardBody h={120}>
                    <a href={article.url}>
                      <Heading size="md">{article.title}</Heading>
                    </a>
                    <Text py="2">{article.author}</Text>
                    <Text py="2">
                      {article.published_date.toLocaleDateString()}
                    </Text>
                  </CardBody>
                </Stack>
              </Card>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <>
      {!isLoading && (
        <>
          <Heading as="h3" size={"lg"} textAlign={"left"} className="p-4">
            Recommended Article
          </Heading>
          <RecommendedArticle
            article={articles[0]}
            onArticleClick={() => handleUrlButton(articles[0].url)}
          />
        </>
      )}

      <Heading as="h3" size={"lg"} textAlign={"left"} className="p-4">
        More Articles
      </Heading>
      <div>{renderArticles()}</div>
    </>
  );
};

export default ArticleList;
