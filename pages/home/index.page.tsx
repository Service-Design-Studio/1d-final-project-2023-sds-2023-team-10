import React, { useEffect, useState } from "react";
import axios from "../axiosFrontend";
import AppLayout from "@/components/AppLayout";
import { Box, Heading, Spinner } from "@chakra-ui/react";
import PregnantCard from "./pregnantcard";
import ArticleList from "./ArticleList";
import withAuth from "@/components/withAuth";
import useUser from "@/components/useUser";

function Home() {
  const [user, isLoadingUser] = useUser();
  const userId = user?.id;

  const fetch = async () => {
    const data = await axios.get(`/api/users/${userId}`);
  };

  useEffect(() => {
    if (userId) {
      fetch();
    } else {
      console.log("User is not set yet");
    }
  }, [userId]);

  if (!user) {
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
  }

  return (
    <AppLayout>
      <Box className="flex flex-col justify-center min-h-full mx-auto px-4 max-w-screen-sm">
        <Heading as="h3" size="xl" className="mb-2 text-left p-4">
          Hello, {user.first_name} {user.second_name}!
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
      </Box>
    </AppLayout>
  );
}

export default withAuth(Home);
