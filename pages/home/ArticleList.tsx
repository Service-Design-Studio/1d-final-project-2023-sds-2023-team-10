import React, { useEffect, useState } from "react";
import { Article } from "../../types";
import axios from "../axiosFrontend";
import {
  Badge,
  Card,
  CardBody,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import RecommendedArticle from "./RecommendedArticle";
import useUser from "@/components/useUser";

const handleUrlButton = (url: string) => {
  window.open(url, "_blank");
};

const alifeImgUrl =
  "https://static.wixstatic.com/media/52413c_c0e379d4681d426c963738d85eb9fb41~mv2.png/v1/fill/w_153,h_59,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/aLIFE%20logo.png";

const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, isLoadingUser] = useUser();

  useEffect(() => {
    fetchArticles();

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
      setArticles(fetchedArticles);
      setIsLoading(false);
    }, 20);
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

  const filteredArticleBasedOnUserGroup = (articles: any) => {
    const realOccupation =
      user?.occupation && user?.occupation !== "string"
        ? user?.occupation
        : "Pregnant Teens";

    const filteredArticles = articles.filter((article: any) => {
      return article.user_group.includes(realOccupation);
    });
    return filteredArticles;
  };

  // Create a function to render the articles as a list of Card components.
  const renderArticles = (articles: any) => {
    return (
      <>
        <div
          className="flex flex-col items-center justify-center"
          data-testid="articlelist"
        >
          {articles.map((article: any, index: any) => {
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
                cursor={"pointer"}
                w="100%"
                key={article.id}
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
                    <Heading size="md">{article.title}</Heading>
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
          <Heading
            as="h3"
            size={"lg"}
            textAlign={"left"}
            className="p-4"
            data-testid="recommendedarticle"
          >
            Recent Article
          </Heading>
          <RecommendedArticle
            article={articles[0]}
            onArticleClick={() => handleUrlButton(articles[0].url)}
          />
        </>
      )}
      {!isLoading && (
        <>
          <Heading
            as="h3"
            size={"lg"}
            textAlign={"left"}
            className="p-4"
            data-testid="basedonyourprofile"
          >
            Articles based on your profile
            <Badge colorScheme="green" className="ml-2">
              NEW
            </Badge>
          </Heading>
          <div>{renderArticles(filteredArticleBasedOnUserGroup(articles))}</div>
        </>
      )}

      <Heading
        as="h3"
        size={"lg"}
        textAlign={"left"}
        className="p-4"
        data-testid="morearticle"
      >
        More Articles
      </Heading>
      <div>{renderArticles(articles)}</div>
      <Heading as="h3" size={"lg"} textAlign={"left"} className="p-4">
        Links to SSA
      </Heading>
      <Card
        onClick={() => handleUrlButton("https://www.alife.org.sg/")}
        direction="row"
        overflow="hidden"
        variant="outline"
        margin="1"
        height={120}
        borderRadius={20}
        cursor={"pointer"}
        w="100%"
        data-testid="alife"
      >
        <Image
          objectFit="cover"
          h="100%"
          w="120px"
          borderRadius="20"
          src={alifeImgUrl}
          alt="A life Social service agency"
        />

        <Stack height="100%">
          <CardBody h={120}>
            <Heading as="h3" size={"md"}>
              aLife Social Service Agency
            </Heading>
          </CardBody>
        </Stack>
      </Card>
    </>
  );
};

export default ArticleList;
