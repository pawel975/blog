import { Spinner } from "reactstrap";
import Layout from "../../Layout/Layout";
import PostsTable from "../../Components/PostsTable/PostsTable";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
import useApiData from "../../../hooks/useApiData";

const Posts: React.FC = () => {
  const { data, loading, error } = useApiData("api/blogPosts");

  return (
    <Layout header="Posts">
      {loading ? (
        <Spinner color="secondary">Loading...</Spinner>
      ) : error ? (
        <ErrorMessage message={error.message} />
      ) : (
        <PostsTable posts={data} />
      )}
    </Layout>
  );
};

export default Posts;
