import React, { useState } from "react";
import { Article } from "../../../types";
import article from "../dummyJSON/article.json";

const ArticlesPage: React.FC = () => {
  const placeholderArticle: Article = article[0];
  const [articles, setArticles] = useState<Article[]>([placeholderArticle]);

  return (
    <div className="flex justify-center min-h-screen min-w-full">
      <div>ArticlesPage</div>
    </div>
  );
};

export default ArticlesPage;
