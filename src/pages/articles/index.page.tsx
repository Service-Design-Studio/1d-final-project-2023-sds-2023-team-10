import React, { useEffect, useState } from "react";
import { Article } from "../../../types";
import article from "../dummyJSON/article.json";
import { Card } from "antd";
// import Meta from "antd/es/card/Meta";
import MainLayout from "../../../components/MainLayout";

const ArticlesPage: React.FC = () => {
  // import all the articles
  const {
    id,
    publishedDate,
    createdDate,
    title,
    author,
    imgUrl,
    url,
    userGroup,
  } = article[0];

  const placeholderArticle: Article = {
    id,
    publishedDate: new Date(publishedDate),
    createdDate: new Date(createdDate),
    title,
    author,
    imgUrl,
    url,
    userGroup,
  };

  const [articles, setArticles] = useState<Article[]>([]);

  const fetchArticles = async () => {
    const response = await fetch("../api/articles");
    const data = await response.json();
    setArticles(data);
  };

  useEffect(() => {
    fetchArticles();
    console.log(articles);

    return () => {
      setArticles([]);
    };
  }, []);

  // Create a function to render the articles as a list of Card components.
  const renderArticles = () => {
    return articles.map((article) => (
      <Card
        key={article.id}
        className="m-4 max-w-full"
        cover={
          <img alt={article.title} src={article.imgUrl} className="flex " />
        }
      >
        {/* <Meta title={article.title} description={article.author} /> */}
        <h1 className="text-gray-600 mt-2">Title: {article.title}</h1>
        {/* <h2 className="text-gray-600 mt-2">Author: {article.author}</h2> */}
        {/* <p className="text-gray-600 mt-2">
          Published Date: {article.publishedDate.toLocaleDateString()}
        </p> */}
        {/* <p className="text-gray-600">
          Created Date: {article.createdDate.toLocaleDateString()}
        </p> */}
        {/* <p className="text-gray-600">{article.url}</p> */}
        {/* <p className="text-gray-600">
          User Group: {article.userGroup.join(", ")}
        </p> */}
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
