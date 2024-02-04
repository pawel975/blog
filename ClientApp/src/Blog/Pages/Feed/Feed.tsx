import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import useApiData from "../../../hooks/useApiData";
import { Container, Spinner } from "reactstrap";
import BlogPostList from "../../Components/BlogPostList";
import { getBlogPosts } from "../../../data/services/BlogPostService";
import { BlogPost } from "../../../data/model/BlogPostModel";

const Feed: React.FC = () => {
  console.log("Blog component rendered");

  const { data, loading, error } = useApiData<BlogPost[]>(() => getBlogPosts());

  const [blogPosts, setBlogPosts] = useState<BlogPost[] | null>([]);

  useEffect(() => {
    if (!loading && !error) {
      setBlogPosts(data);
    }
  }, [data, loading, error]);

  return (
    <Layout>
      <header className="blog-header">
        <h1>Feed</h1>
      </header>
      <hr />
      {loading ? (
        <Spinner />
      ) : (
        blogPosts && (
          <Container className="d-flex flex-column gap-1 p-0">
            <BlogPostList blogPosts={blogPosts} />
            {/* <GenerateBlogPost contentElements={blogPosts[0]} /> */}
          </Container>
        )
      )}
    </Layout>
  );
};

export default Feed;
