import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import GenerateBlogPost from "../../../components/GenerateBlogPost/GenerateBlogPost";
import useApiData from "../../../hooks/useApiData";
import { ContentElements } from "../../../common/types";
import { Container, Spinner } from "reactstrap";

const Feed: React.FC = () => {
  console.log("Blog component rendered");

  const { data, loading, error } = useApiData("api/blogPosts");

  const [blogPosts, setBlogPosts] = useState<ContentElements[]>([
    {
      paragraphs: [],
      headers: [],
      codeBlocks: [],
      contentImages: [],
    },
  ]);

  useEffect(() => {
    if (!loading && !error) {
      const blogPosts = [...data].map((blogPost) => {
        const { paragraphs, headers, codeBlocks, contentImages } = blogPost;

        return {
          paragraphs: paragraphs,
          headers: headers,
          codeBlocks: codeBlocks,
          contentImages: contentImages,
        };
      });

      setBlogPosts(blogPosts);
    }
  }, [data, loading, error]);

  return (
    <Layout>
      <header>
        <h1>Feed</h1>
      </header>
      <hr />
      {loading ? (
        <Spinner />
      ) : (
        blogPosts.map((bp) => (
          <Container className="d-flex flex-column gap-1 p-0">
            <GenerateBlogPost contentElements={bp} />
          </Container>
        ))
      )}
    </Layout>
  );
};

export default Feed;
