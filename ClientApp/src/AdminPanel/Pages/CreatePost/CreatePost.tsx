import React, { useState } from "react";
import axios from "axios";
import Layout from "../../Layout/Layout";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

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
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            id="title"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="shortDescription">Short Description</Label>
          <Input
            type="text"
            id="shortDescription"
            name="shortDescription"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="primaryImageSrc">Primary Image Source</Label>
          <Input
            id="primaryImageSrc"
            type="text"
            name="primaryImageSrc"
            value={primaryImageSrc}
            onChange={(e) => setPrimaryImageSrc(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="blogPostContent">Blog post content</Label>
          <Input
            id="blogPostContent"
            type="textarea"
            name="blogPostContent"
            value={blogPostContent}
            onChange={(e) => setBlogPostContent(e.target.value)}
          />
        </FormGroup>
        <Button color="primary">Create</Button>
      </Form>
    </Layout>
  );
};

export default CreatePost;
