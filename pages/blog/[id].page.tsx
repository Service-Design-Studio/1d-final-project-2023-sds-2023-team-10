import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react";
import BlogLayout from "../../components/BlogLayout";
import "tailwindcss/tailwind.css";

interface BlogPost {
  title: string;
  date: string;
  blog: string;
}

const useBlogPost = (id: string) => {
  const [singleBlogPost, setSingleBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`/api/blog?id=${id}`)
        .then((response) => response.json())
        .then((data) => setSingleBlogPost(data));
      setLoading(false);
    }
  }, [id]);

  return {
    singleBlogPost,
    loading,
  };
};

const useAllBlogPostByUser = (userId: string) => {
  const [allBlogPostByUser, setAllBlogPostByUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      fetch(`/api/userblog?userId=${userId}`)
        .then((response) => response.json())
        .then((data) => setAllBlogPostByUser(data));
      setLoading(false);
    }
  }, [userId]);

  return {
    allBlogPostByUser,
    loading,
  };
};

const ReadMoreBlogCard = ({ blogPost }: { blogPost: BlogPost }) => {
  return (
    <Card>
      <CardHeader padding={0}>
        <Heading size="md" fontFamily={"lora"}>
          {blogPost.title}
        </Heading>
      </CardHeader>
      <CardBody padding={0}>
        <Text fontFamily={"sans-serif"} color="gray">
          {blogPost.date}
        </Text>
      </CardBody>
    </Card>
  );
};

export default function BlogPostPage() {
  const router = useRouter();
  const { id } = router.query;

  const { singleBlogPost } = useBlogPost(id as string);
  const { allBlogPostByUser } = useAllBlogPostByUser("user id");

  console.log("allblogpost by user", allBlogPostByUser);

  if (!singleBlogPost || !allBlogPostByUser) {
    return (
      <div>
        <Spinner></Spinner>
      </div>
    );
  }

  return (
    <BlogLayout>
      <Box bg="green-300" p="6" fontFamily="serif, lora">
        <>
          <Heading as="h1" mb="4">
            {singleBlogPost.title}
          </Heading>
          <Text fontSize="sm" color="gray.500" mb="4">
            {singleBlogPost.date}
          </Text>
          <Text>{singleBlogPost.blog}</Text>
          <Text>- M -</Text>
        </>
        {allBlogPostByUser.blogs.length > 0 && (
          <>
            <h2>Read more..</h2>
            <div>
              {allBlogPostByUser.blogs.map((blogPost: any) => {
                return (
                  <div style={{ minWidth: "300px" }}>
                    <ReadMoreBlogCard blogPost={blogPost} />
                  </div>
                );
              })}
            </div>
          </>
        )}
      </Box>
    </BlogLayout>
  );
}
