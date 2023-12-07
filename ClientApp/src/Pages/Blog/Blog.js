import React, { useState, useEffect } from "react";
import Layout from "./Layout/Layout";

const Blog = () => {
  console.log("Blog component rendered");

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("api/blogPosts")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      });
  }, []);

  return (
    <Layout>
      <div>
        <h1>Hello, world!</h1>
        <p>Welcome to your new single-page application, built with:</p>
      </div>
    </Layout>
  );
};

export default Blog;
