import React, { useEffect, useState } from "react";
import { Article } from "../../../types";
import article from "../dummyJSON/article.json";
import { Card, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
// import Meta from "antd/es/card/Meta";
import MainLayout from "../../../components/MainLayout";
import axios from "axios";
import Meta from "antd/lib/card/Meta";

const ArticlesPage: React.FC = () => {
  // import all the articles
  const {
    id,
    published_date,
    created_date,
    title,
    author,
    img_url,
    url,
    user_group,
  } = article[0];

  const placeholderArticle: Article = {
    id,
    published_date: new Date(published_date),
    created_date: new Date(created_date),
    title,
    author,
    img_url,
    url,
    user_group,
  };

  const [articles, setArticles] = useState<Article[]>([]);

  const fetchArticles = async () => {
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
    console.log("articles", articles);

    return () => {
      setArticles([]);
    };
  }, []);

  console.log("articles", articles);

  // Create a function to render the articles as a list of Card components.
  const renderArticles = () => {
    return articles.map((article) => (
      <Card
        key={article.id}
        className="m-4 max-w-full"
        cover={
          <img alt={article.title} src={article.img_url} className="flex " />
        }
        extra={
          <Popconfirm
            title="Are you sure you want to delete this article?"
            onConfirm={() => deleteArticle(article.id)}
            okText="Yes"
            cancelText="No"
          >
            <div className="flex items-center justify-center w-8 h-8 bg-red-300 text-white rounded-full">
              <DeleteOutlined />
            </div>
          </Popconfirm>
        }
      >
        <Meta title={article.title} description={article.author} />
        <h1 className="text-gray-600 mt-2">Title: {article.title}</h1>
        <h2 className="text-gray-600 mt-2">Author: {article.author}</h2>
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
        <p className="text-gray-600">{article.url}</p>
        <p className="text-gray-600">
          User Group: {article.user_group.join(", ")}
        </p>
      </Card>
    ));
  };

  return (
    <MainLayout>
      <div className="flex-col justify-center min-h-screen min-w-full">
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4"> */}
        <div className="">
          {/* {renderArticles()} */}
          {renderArticles()}
        </div>
      </div>
    </MainLayout>
  );
};
export default ArticlesPage;
