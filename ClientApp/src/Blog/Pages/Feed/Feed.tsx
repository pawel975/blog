import React from "react";
import Layout from "../../Layout/Layout";
import useApiData from "../../../hooks/useApiData";
import { Spinner, Table } from "reactstrap";
import ErrorMessage from "../../../AdminPanel/Components/ErrorMessage/ErrorMessage";
import PostsTable from "../../../AdminPanel/Components/PostsTable/PostsTable";

const Feed: React.FC = () => {
  console.log("Blog component rendered");

  const { data, loading, error } = useApiData("api/blogPosts");

  return (
    <Layout>
      <header>
        <h1>Posts</h1>
      </header>
      <hr />

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

export default Feed;
