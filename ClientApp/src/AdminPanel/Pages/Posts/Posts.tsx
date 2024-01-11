import { Spinner } from "reactstrap";
import Layout from "../../Layout/Layout";
import PostsTable from "./Components/PostsTable/PostsTable";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import useApiData from "../../../hooks/useApiData";
import { useEffect, useState } from "react";

const Posts: React.FC = () => {
  const { data, loading, error } = useApiData("api/blogPosts");

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!loading && !error) setPosts(data);
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
