import React, { useEffect, useState } from "react";
import axios from "axios";
import AppLayout from "@/components/AppLayout";
import { Box, Heading, Spinner } from "@chakra-ui/react";
import PregnantCard from "./pregnantcard";
import ArticleList from "./ArticleList";

function Home() {
  const [user, setUser] = useState<any>(null);

  const fetch = async () => {
    const data = await axios.get("/api/users/2");
    setUser(data.data);
  };

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
      <div className="flex flex-col justify-center min-h-full mx-auto px-4 max-w-screen-sm">
        <Heading as="h3" size="xl" className="mb-2 text-left p-4">
          Hello, {user.first_name} {user.last_name}!
        </Heading>

        {user.pregnancy_week !== null && user.pregnancy_week !== undefined && (
          <PregnantCard
            week={user.pregnancy_week}
            imageUrl={
              "https://s3.eu-central-1.amazonaws.com/uploads.mangoweb.org/shared-prod/visegradfund.org/uploads/2021/03/depositphotos_121233300-stock-illustration-female-default-avatar-gray-profile.jpg"
            }
          />
        )}
        <ArticleList />

        <Box marginBottom={275}></Box>
      </div>
    </AppLayout>
  );
}

export default Home;
