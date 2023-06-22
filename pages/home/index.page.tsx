import React, { useEffect, useState } from "react";
import axios from "axios";
import AppLayout from "@/components/AppLayout";
import { Heading, Spinner } from "@chakra-ui/react";
import PregnantCard from "./pregnantcard";
import ArticleList from "./ArticleList";
import RecommendedArticle from "./RecommendedArticle";

function Home() {
  const [user, setUser] = useState<any>(null);

  const fetch = async () => {
    const data = await axios.get("/api/users/2");
    setUser(data.data);
  };

  const bodyText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing eces pulvinar. nenatis augue, at pretium orci. D ultrices nulla quis, congue elit. Nunc lobortis, orci sed aliquet cursus, lorem tellus laoreet nibhrat. Aliquam id egestas quam.";

  useEffect(() => {
    fetch();
  }, []);

  if (!user)
    return (
      <AppLayout>
        <div
          className="flex items-center justify-center min-h-full"
          style={{ minHeight: "500px" }}
        >
          <Spinner />
        </div>
      </AppLayout>
    );

  console.log(user);

  return (
    <AppLayout>
      <Heading as="h3" size="md" className="mb-2">
        Hello, {user.first_name} {user.last_name}!
      </Heading>

      {user.pregnancy_week !== null && user.pregnancy_week !== undefined && (
        <PregnantCard
          week={user.pregnancy_week}
          body={bodyText}
          imageUrl={
            "https://hips.hearstapps.com/hmg-prod/images/cute-cat-photos-1593441022.jpg?crop=1.00xw:0.753xh;0,0.153xh&resize=1200:*"
          }
        />
      )}
      <RecommendedArticle />
      <ArticleList />
    </AppLayout>
  );
}

export default Home;
