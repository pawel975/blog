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
import { useNavigate, useParams } from "react-router-dom";
import useApiData from "../../../hooks/useApiData";

interface ErrorsObject {
  BlogPostContent?: string[];
  ShortDescription?: string[];
  Title?: string[];
  PrimaryImageSrc?: string[];
}

type ErrorArray = string[] | undefined;

// TODO: Copied from Create Post page, check if it's right to update
const EditPost: React.FC = () => {
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
  const { postId } = useParams();
  // Get value of edit post
  const { data, loading, error } = useApiData(`api/blogPosts/${postId}`);

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
      .put(`/api/blogPosts/${postId}`, formData, {
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
        console.error("Failed to edit post:", error);
      });
  };

  useEffect(() => {
    const inputFields = Object.keys(errors);

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

  // TODO: Set init value for edit, download those from API based on id
  // TODO: Refactor this
  useEffect(() => {
    if (!loading && !error) {
      for (const key in data) {
        switch (key) {
          case "title":
            setTitle(data[key]);
            break;
          case "shortDescription":
            setShortDescription(data[key]);
            break;
          case "primaryImageSrc":
            setPrimaryImageSrc(data[key]);
            break;
          case "blogPostContent":
            setBlogPostContent(data[key]);
            break;
          default:
            if (key !== "id") console.error(`No action for key of '${key}'`);
            break;
        }
      }
    }
  }, [data, loading, error]);

  return (
    <Layout header="Edit Post">
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
        <Button color="primary">Edit</Button>
      </Form>
    </Layout>
  );
};

export default EditPost;
