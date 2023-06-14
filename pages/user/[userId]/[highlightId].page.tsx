import BlogLayout from "@/components/BlogLayout";
import { Highlight } from "@/types";
import { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const useHighlight = (userId: string, highlightId: string) => {
  const [highlight, setHighlight] = useState<Highlight | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      fetch(
        `/api/user/getHighlight?userId=${userId}&highlightId=${highlightId}`
      )
        .then((response) => response.json())
        .then((data) => {
          setHighlight(data.highlight);
        });
      setLoading(false);
    }
  }, [userId, highlightId]);

  return { highlight, loading };
};

const HighlightSelected = () => {
  const router = useRouter();
  const { userId, highlightId } = router.query;

  const { highlight, loading } = useHighlight(
    userId as string,
    highlightId as string
  );
  console.log("di sini", highlight); // this is the shape {title: 'highlight title', content: 'highlight content', id: 'test2', date: '2018-01-02'}

  return (
    <BlogLayout>
      {/* TODO: styling on this page */}
      <div>highlight</div>
    </BlogLayout>
  );
};

export default HighlightSelected;
