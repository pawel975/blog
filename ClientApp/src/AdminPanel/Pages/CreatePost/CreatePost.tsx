import React, { useState } from "react";
import axios from "axios";
import Layout from "../../Layout/Layout";

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [primaryImageSrc, setPrimaryImageSrc] = useState("");
  const [blogPostContent, setBlogPostContent] = useState("");

  // Change it so it doesnt run on every typed letter in form
  const handleSubmit = () => {
    const formData = {
      title: title,
      shortDescription: shortDescription,
      primaryImageSrc: primaryImageSrc,
      blogPostContent: blogPostContent,
    };

    axios
      .post("/api/blogPosts", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Post created successfully");
      })
      .catch((error) => {
        console.error("Failed to create post:", error);
      });
  };

  return (
    <Layout header="Create Post">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Short Description</label>
          <input
            type="text"
            name="shortDescription"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Primary Image Source</label>
          <input
            type="text"
            name="primaryImageSrc"
            value={primaryImageSrc}
            onChange={(e) => setPrimaryImageSrc(e.target.value)}
          />
        </div>
        <div>
          <label>Blog post content</label>
          <textarea
            name="blogPostContent"
            value={blogPostContent}
            onChange={(e) => setBlogPostContent(e.target.value)}
          />
        </div>
        <input type="submit" value="Create" />
      </form>
    </Layout>
  );
};

export default CreatePost;
