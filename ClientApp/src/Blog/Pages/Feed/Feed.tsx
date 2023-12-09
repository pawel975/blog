import React from "react";
import Layout from "../../Layout/Layout";
import useApiData from "../../../hooks/useApiData";
import { Spinner } from "reactstrap";
import ErrorMessage from "../../../AdminPanel/Components/ErrorMessage/ErrorMessage";

const Feed: React.FC = () => {
  console.log("Blog component rendered");

  const { data, loading, error } = useApiData("api/blogPosts");

  const allPosts = data
    ? data.map((item: any) => (
        <div>
          <h3>{item.title}</h3>
          <p>{item.shortDescription}</p>
        </div>
      ))
    : "x";

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
        allPosts
      )}
    </Layout>
  );
};

export default Feed;
