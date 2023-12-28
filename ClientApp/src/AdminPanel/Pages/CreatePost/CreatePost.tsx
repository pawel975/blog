import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../Layout/Layout";
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

interface ErrorsObject {
  BlogPostContent?: string[];
  ShortDescription?: string[];
  Title?: string[];
  PrimaryImageSrc?: string[];
}

type ErrorArray = string[] | undefined;

// TODO: Copied from Create Post page, check if it's right to update
const CreatePost: React.FC = () => {
  const [title, setTitle] = useState<string | undefined>("");
  const [titleErrors, setTitleErrors] = useState<ErrorArray>([]);

  const [shortDescription, setShortDescription] = useState<string | undefined>(
    ""
  );
  const [shortDescriptionErrors, setShortDescriptionErrors] =
    useState<ErrorArray>([]);

  const [primaryImageSrc, setPrimaryImageSrc] = useState<string>("");
  const [primaryImageSrcErrors, setPrimaryImageSrcErrors] =
    useState<ErrorArray>([]);

  const [blogPostContent, setBlogPostContent] = useState<string>("");
  const [blogPostContentErrors, setBlogPostContentErrors] =
    useState<ErrorArray>([]);

  const navigate = useNavigate();

  // TODO: change any
  const [errors, setErrors] = useState<ErrorsObject>({});

  // Change it so it doesnt run on every typed letter in form
  const handleSubmit = (e: any) => {
    e.preventDefault();
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
        navigate("/admin-panel/posts");
      })
      .catch((error) => {
        setErrors(error.response.data.errors);
        console.error("Failed to create post:", error);
      });
  };

  useEffect(() => {
    console.log(errors, "errors");
    console.log("titleErrors", titleErrors);

    const inputFields = Object.keys(errors);

    setTitleErrors([]);
    setShortDescriptionErrors([]);
    setPrimaryImageSrcErrors([]);
    setBlogPostContentErrors([]);

    inputFields.forEach((field) => {
      if (field === "Title") {
        setTitleErrors(errors[field]);
      } else if (field === "ShortDescription") {
        setShortDescriptionErrors(errors[field]);
      } else if (field === "PrimaryImageSrc") {
        setPrimaryImageSrcErrors(errors[field]);
      } else if (field === "BlogPostContent") {
        setBlogPostContentErrors(errors[field]);
      }
    });
  }, [errors]);

  return (
    <Layout header="Create Post">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            invalid={titleErrors && Boolean(titleErrors.length > 0)}
            id="title"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {titleErrors &&
            titleErrors.map((errorMsg) => (
              <FormFeedback>{errorMsg}</FormFeedback>
            ))}
        </FormGroup>

        <FormGroup>
          <Label for="shortDescription">Short Description</Label>
          <Input
            invalid={
              shortDescriptionErrors &&
              Boolean(shortDescriptionErrors.length > 0)
            }
            type="text"
            id="shortDescription"
            name="shortDescription"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
          />
          {shortDescriptionErrors &&
            shortDescriptionErrors.map((errorMsg) => (
              <FormFeedback>{errorMsg}</FormFeedback>
            ))}
        </FormGroup>

        <FormGroup>
          <Label for="primaryImageSrc">Primary Image Source</Label>
          <Input
            invalid={
              primaryImageSrcErrors && Boolean(primaryImageSrcErrors.length > 0)
            }
            id="primaryImageSrc"
            type="text"
            name="primaryImageSrc"
            value={primaryImageSrc}
            onChange={(e) => setPrimaryImageSrc(e.target.value)}
          />
          {primaryImageSrcErrors &&
            primaryImageSrcErrors.map((errorMsg) => (
              <FormFeedback>{errorMsg}</FormFeedback>
            ))}
        </FormGroup>

        <FormGroup>
          <Label for="blogPostContent">Blog post content</Label>
          <Input
            invalid={
              blogPostContentErrors && Boolean(blogPostContentErrors.length > 0)
            }
            id="blogPostContent"
            type="textarea"
            name="blogPostContent"
            value={blogPostContent}
            onChange={(e) => setBlogPostContent(e.target.value)}
          />
          {blogPostContentErrors &&
            blogPostContentErrors.map((errorMsg) => (
              <FormFeedback>{errorMsg}</FormFeedback>
            ))}
        </FormGroup>
        <Button color="primary">Create</Button>
      </Form>
    </Layout>
  );
};

export default CreatePost;
