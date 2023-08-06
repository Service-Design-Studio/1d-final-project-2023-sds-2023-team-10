/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Popconfirm, Spin, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import Image from "next/image";
import { Article } from "../../../types";
import article from "../dummyJSON/article.json";
// import Meta from "antd/es/card/Meta";
import MainLayout from "../../../components/MainLayout";
import axios from "../axiosFrontend";

const handleUrlButton = (url: string) => {
  window.open(url, "_blank");
};

const ArticlesPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchArticles = async () => {
    setIsLoading(true);
    const createArticleResponse = await axios.get("/api/articles", {
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
    }, 1000);
    setArticles(fetchedArticles);
  };

  const deleteArticle = async (articleId: number) => {
    try {
      // Replace this block with the actual API request to delete the article
      await axios.delete(`/api/articles/${articleId}`);

      // Update the local articles state by removing the deleted article
      const updatedArticles = articles.filter(
        (article) => article.id !== articleId
      );
      setArticles(updatedArticles);

      // Display a message indicating the deletion success
      message.success("Article deleted successfully.");
    } catch (error) {
      console.error("Frontend error:", error);
    }
  };

  useEffect(() => {
    fetchArticles();
    return () => {
      setArticles([]);
    };
  }, []);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex h-screen w-full items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <Spin size="large" />
            <h1 className="text-4xl">Loading articles...</h1>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Create a function to render the articles as a list of Card components.
  const renderArticles = () => {
    return articles.map((article) => (
      <Card
        key={article.id}
        className="w-full"
        cover={
          <div className="w-full">
            <img
              alt={article.title}
              src={article.img_url}
              className="w-full h-36 mx-auto object-cover rounded-lg"
            />
          </div>
        }
        loading={isLoading}
        bodyStyle={{ height: "400px", paddingTop: "5px" }}
      >
        <div className="flex flex-col content-start min-h-full">
          <h4 className="text-gray-600 mt-2">Title: {article.title}</h4>
          <p className="text-gray-600 mt-2">Author: {article.author}</p>
          <p className="text-gray-600 mt-2">
            Published Date:{" "}
            {article.published_date &&
              article.published_date.toISOString().substring(0, 10)}
          </p>
          <p className="text-gray-600">
            Created Date:{" "}
            {article.created_date &&
              article.created_date.toISOString().substring(0, 10)}
          </p>

          <p className="text-gray-600">
            User Group: {article.user_group.join(", ")}
          </p>
          <div className="flex flex-row min-w-full justify-between mt-auto">
            {" "}
            <Button
              type="primary"
              data-testid="visit-article-button"
              onClick={() => handleUrlButton(article.url)}
            >
              Visit Link
            </Button>{" "}
            <Popconfirm
              title="Are you sure you want to delete this article?"
              onConfirm={() => deleteArticle(article.id)}
              okText={<span data-testid={`yes-button-${article.id}`}>Yes</span>}
              cancelText={
                <span data-testid={`no-button-${article.id}`}>No</span>
              }
            >
              <div
                className="flex items-center justify-center w-8 h-8 bg-red-400 hover:bg-red-300 cursor-pointer text-white rounded-full"
                data-testid={`delete-article-button-${article.id}`}
              >
                <DeleteOutlined />
              </div>
            </Popconfirm>
          </div>
        </div>
      </Card>
    ));
  };

  return (
    <MainLayout>
      <Alert
        description="These are the articles that will be shown to the users. Click articles and create articles to add more articles."
        type="info"
        showIcon
        className="h-18 mt-3"
      />
      <div className="flex-col justify-center min-h-screen min-w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 p-4">
          {isLoading ? (
            <div className="flex justify-center align-middle font-normal">
              <div className="font-light text-sm">Loading...</div>
            </div>
          ) : articles.length === 0 ? (
            <div className="flex justify-center align-middle">
              <div>
                <h1>You have no articles, please create a new article!</h1>
              </div>
            </div>
          ) : (
            renderArticles()
          )}
        </div>
      </div>
    </MainLayout>
  );
};
export default ArticlesPage;
