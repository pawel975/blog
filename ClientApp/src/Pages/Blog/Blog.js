import React, { useState, useEffect } from "react";
import Layout from "./Layout/Layout";

const Blog = () => {
  console.log("Blog component rendered");

  const [data, setData] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    fetch("api/blogPosts")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      });
    setIsDataLoading(false);
  }, []);

  return (
    <Layout>
      <div>
        <h1>Hello, world!</h1>
        <p>Welcome to your new single-page application, built with:</p>
      </div>
      {isDataLoading ? (
        <h3>Loading...</h3>
      ) : (
        data.map((item) => (
          <div>
            <h3>{item.title}</h3>
            <p>{item.shortDescription}</p>
          </div>
        ))
      )}
    </Layout>
  );
};

export default Blog;
