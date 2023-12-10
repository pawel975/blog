import React from "react";
import Layout from "../../Layout/Layout";

const Feed: React.FC = () => {
  console.log("Blog component rendered");

  return (
    <Layout>
      <header>
        <h1>Feed</h1>
      </header>
      <hr />
    </Layout>
  );
};

export default Feed;
