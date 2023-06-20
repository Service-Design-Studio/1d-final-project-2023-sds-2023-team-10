import React, { useEffect, useState } from "react";
import axios from "axios";
import AppLayout from "@/components/AppLayout";
import { Spinner } from "@chakra-ui/react";
import PregnantCard from "./pregnantcard";

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
      {user.pregnancy_week && (
        <PregnantCard
          week={5}
          body={"hi"}
          imageUrl={
            "https://hips.hearstapps.com/hmg-prod/images/cute-cat-photos-1593441022.jpg?crop=1.00xw:0.753xh;0,0.153xh&resize=1200:*"
          }
        />
      )}
      <div>HOME </div>
    </AppLayout>
  );
}

export default Home;
