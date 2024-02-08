import { Spinner } from "reactstrap";
import Layout from "../../Layout/Layout";
import PostsTable from "./Components/PostsTable/PostsTable";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import useApiData from "../../../hooks/useApiData";
import { useEffect, useState } from "react";
import { getBlogPosts } from "../../../data/services/BlogPostService";
import { BlogPost } from "../../../data/model/BlogPostModel";

const Posts: React.FC = () => {
  const { data, loading, error } = useApiData<BlogPost[]>(() => getBlogPosts());

  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (!loading && !error && data) setPosts(data);
  }, [data, loading, error]);

  return (
    <Layout header="Posts">
      {loading ? (
        <Spinner color="secondary">Loading...</Spinner>
      ) : error ? (
        <ErrorMessage message={error.message} />
      ) : (
        <PostsTable posts={posts} setPosts={setPosts} />
      )}
    </Layout>
  );
};

export default Posts;
