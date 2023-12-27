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

// interface EditPostInterface {
//   postId: string | number;
// }

// TODO: Copied from Create Post page, check if it's right to update
const EditPost: React.FC = () => {
  const [title, setTitle] = useState<string | undefined>("");
  const [titleErrors, setTitleErrors] = useState<string[]>([]);

  const [shortDescription, setShortDescription] = useState<string | undefined>(
    ""
  );
  const [shortDescriptionErrors, setShortDescriptionErrors] = useState<
    String[]
  >([]);

  const [primaryImageSrc, setPrimaryImageSrc] = useState<string>("");
  const [primaryImageSrcErrors, setPrimaryImageSrcErrors] = useState<String[]>(
    []
  );

  const [blogPostContent, setBlogPostContent] = useState<string>("");
  const [blogPostContentErrors, setBlogPostContentErrors] = useState<string[]>(
    []
  );

  const navigate = useNavigate();
  const { postId } = useParams();
  // Get value of edit post
  const { data, loading, error } = useApiData(`api/blogPosts/${postId}`);

  // TODO: change any
  const [errors, setErrors] = useState<any>({});

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
      } else if (field === "Shortdescription") {
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
            invalid={Boolean(titleErrors.length > 0)}
            id="title"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {titleErrors.map((errorMsg) => (
            <FormFeedback>{errorMsg}</FormFeedback>
          ))}
        </FormGroup>

        <FormGroup>
          <Label for="shortDescription">Short Description</Label>
          <Input
            invalid={Boolean(shortDescriptionErrors.length > 0)}
            type="text"
            id="shortDescription"
            name="shortDescription"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
          />
          {shortDescriptionErrors.map((errorMsg) => (
            <FormFeedback>{errorMsg}</FormFeedback>
          ))}
        </FormGroup>

        <FormGroup>
          <Label for="primaryImageSrc">Primary Image Source</Label>
          <Input
            invalid={Boolean(primaryImageSrcErrors.length > 0)}
            id="primaryImageSrc"
            type="text"
            name="primaryImageSrc"
            value={primaryImageSrc}
            onChange={(e) => setPrimaryImageSrc(e.target.value)}
          />
          {primaryImageSrcErrors.map((errorMsg) => (
            <FormFeedback>{errorMsg}</FormFeedback>
          ))}
        </FormGroup>

        <FormGroup>
          <Label for="blogPostContent">Blog post content</Label>
          <Input
            invalid={Boolean(blogPostContentErrors.length > 0)}
            id="blogPostContent"
            type="textarea"
            name="blogPostContent"
            value={blogPostContent}
            onChange={(e) => setBlogPostContent(e.target.value)}
          />
          {blogPostContentErrors.map((errorMsg) => (
            <FormFeedback>{errorMsg}</FormFeedback>
          ))}
        </FormGroup>
        <Button color="primary">Edit</Button>
      </Form>
    </Layout>
  );
};

export default EditPost;
