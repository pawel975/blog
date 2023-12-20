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

interface UpdatePostInterface {
  postId: string | number;
}

// TODO: Copied from Create Post page, check if it's right to update
const UpdatePost: React.FC<UpdatePostInterface> = ({ postId }) => {
  const [title, setTitle] = useState<string | undefined>("");
  const [titleErrors, setTitleErrors] = useState<string[]>([]);

  const [shortDescription, setShortDescription] = useState<string | undefined>(
    ""
  );
  const [shortDescriptionErrors, setShortDescriptionErrors] = useState<
    String[]
  >([]);

  const [primaryImageSrc, setPrimaryImageSrc] = useState<string>("");
  const [primaryImageSrcErrors, setPrimaryImageSrcErrors] = useState<string[]>(
    []
  );

  const [blogPostContent, setBlogPostContent] = useState<string>("");
  const [blogPostContentErrors, setBlogPostContentErrors] = useState<string[]>(
    []
  );

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
      })
      .catch((error) => {
        setErrors(error.response.data.errors);
        console.error("Failed to create post:", error);
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

  return (
    <Layout header="Create Post">
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
        <Button color="primary">Update</Button>
      </Form>
    </Layout>
  );
};

export default UpdatePost;
