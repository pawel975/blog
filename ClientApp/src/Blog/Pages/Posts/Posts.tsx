import React, { useEffect, useState } from "react";
import BlogLayout from "../../Layout/BlogLayout";
import useApiData from "../../../hooks/useApiData";
import { Container, Spinner } from "reactstrap";
import BlogPostList from "../components/BlogPostList";
import { getBlogPosts } from "../../../data/services/BlogPostService";
import { BlogPost } from "../../../data/model/BlogPostModel";
import PageHeader from "../components/PageHeader";

const Feed: React.FC = () => {
  const { data, loading, error } = useApiData<BlogPost[]>(() => getBlogPosts());
  const [blogPosts, setBlogPosts] = useState<BlogPost[] | null>([]);

  useEffect(() => {
    if (!loading && !error) {
      setBlogPosts(data);
    }
  }, [data, loading, error]);

  return (
    <BlogLayout>
      <PageHeader pageTitle="Posts" />
      {loading ? (
        <Spinner />
      ) : (
        blogPosts && (
          <Container className="d-flex flex-column gap-1 p-0">
            <BlogPostList blogPosts={blogPosts} />
          </Container>
        )
      )}
    </BlogLayout>
  );
};

export default Feed;
