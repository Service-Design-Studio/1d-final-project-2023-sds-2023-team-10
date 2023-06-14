import BlogLayout from "@/components/BlogLayout";
import { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  userId: string;
  blogId: string;
}

const HighlightSelected: NextPage<Props> = ({ userId, blogId }) => {
  const router = useRouter();
  console.log("User ID:", userId);
  console.log("Blog ID:", blogId);

  return (
    <BlogLayout>
      <div>
        {userId} {blogId}
      </div>
    </BlogLayout>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { userId, blogId } = context.query;

  return {
    props: {
      userId,
      blogId,
    },
  };
};

export default HighlightSelected;
