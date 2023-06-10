import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import BlogLayout from "../../components/BlogLayout";
import "tailwindcss/tailwind.css";

interface BlogPost {
  title: string;
  date: string;
  blog: string;
}

const BlogPostPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/blog?id=${id}`)
        .then((response) => response.json())
        .then((data) => setBlogPost(data));
    }
  }, [id]);

  return (
    <BlogLayout>
      <Box bg="green-300" p="6">
        {blogPost ? (
          <>
            <Heading as="h1" mb="4" className="text-green-900">
              {blogPost.title}
            </Heading>
            <Text fontSize="sm" color="gray.500" mb="4">
              {blogPost.date}
            </Text>
            <Text className="text-green-700 mb-4">{blogPost.blog}</Text>
            <Text className="text-green-700 mb-4">Read more... {id}</Text>
            <Text className="text-green-900">- M -</Text>
          </>
        ) : (
          <Text>Loading... </Text>
        )}
      </Box>
    </BlogLayout>
  );
};

export default BlogPostPage;
