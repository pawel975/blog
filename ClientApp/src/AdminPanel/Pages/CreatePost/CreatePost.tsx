import React, { useState } from "react";
import axios from "axios";
import Layout from "../../Layout/Layout";
import { Button, Container, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { CodeBlock, ContentImage, Header, Paragraph } from "../../../common/types";
import AddElementForm from "./Components/AddElementForm";
import parseContentElementsNestedErrors from "./helpers/parseContentElementsNestedErrors";
import { ContentElements, ErrorsObject } from "./types";
import PostElements from "./Components/PostElements";

interface FormData {
  title: string;
  shortDescription: string;
  primaryImageSrc: string;
  paragraphs: Paragraph[];
  headers: Header[];
  codeBlocks: CodeBlock[];
  contentImages: ContentImage[];
}

const initErrorState: ErrorsObject = {
  Title: [],
  ShortDescription: [],
  PrimaryImageSrc: [],
  ContentElements: {
    Paragraphs: [],
    Headers: [],
    CodeBlocks: [],
    ContentImages: [],
  },
  Paragraphs: [],
  Headers: [],
  CodeBlocks: [],
  ContentImages: [],
};

const CreatePost: React.FC = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [shortDescription, setShortDescription] = useState<string>("");
  const [primaryImageSrc, setPrimaryImageSrc] = useState<string>("");
  const [contentElements, setContentElements] = useState<ContentElements>({
    paragraphs: [],
    headers: [],
    codeBlocks: [],
    contentImages: [],
  });

  const [errors, setErrors] = useState<ErrorsObject>(initErrorState);

  // TODO: change any
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData: FormData = {
      title: title || "",
      shortDescription: shortDescription || "",
      primaryImageSrc: primaryImageSrc || "",
      paragraphs: contentElements.paragraphs || [],
      headers: contentElements.headers || [],
      codeBlocks: contentElements.codeBlocks || [],
      contentImages: contentElements.contentImages || [],
    };

    // Erase previous errors
    errors && setErrors(initErrorState);

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
        const errorCategories = error.response.data.errors;

        // TODO: Create helper function based on this code
        // Check if there are any errors from API that are not handled
        errorCategories &&
          Object.keys(errorCategories).forEach((category) => {
            if (!Object.keys(errors).includes(category)) {
              console.error(`Not handled category of error from API, error category - ${category}`);
            }
          });

        try {
          const parsedErrors = parseContentElementsNestedErrors(errorCategories);
          console.log(parsedErrors, "parsedErrors");
          if (parsedErrors) setErrors((prevState) => ({ ...prevState, ...parsedErrors }));

          console.error("Failed to create post:", errorCategories);
        } catch (error: any) {
          console.error("Cannot set errors state\n", error);
        }
      });
  };
  return (
    <Layout header="Create Post">
      {/* TODO: Move this form to separate file */}
      <Container className="d-flex flex-column align-items-start gap-2">
        <Form>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              invalid={Boolean(errors.Title.length > 0)}
              id="title"
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.Title.map((errorMsg, index) => (
              <FormFeedback key={index}>{errorMsg}</FormFeedback>
            ))}
          </FormGroup>

          <FormGroup>
            <Label for="shortDescription">Short Description</Label>
            <Input
              invalid={Boolean(errors.ShortDescription.length > 0)}
              type="text"
              id="shortDescription"
              name="shortDescription"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
            />
            {errors.ShortDescription.map((errorMsg, index) => (
              <FormFeedback key={index}>{errorMsg}</FormFeedback>
            ))}
          </FormGroup>

          <FormGroup>
            <Label for="primaryImageSrc">Primary Image Source</Label>
            <Input
              invalid={Boolean(errors.PrimaryImageSrc.length > 0)}
              id="primaryImageSrc"
              type="text"
              name="primaryImageSrc"
              value={primaryImageSrc}
              onChange={(e) => setPrimaryImageSrc(e.target.value)}
            />
            {errors.PrimaryImageSrc.map((errorMsg, index) => (
              <FormFeedback key={index}>{errorMsg}</FormFeedback>
            ))}
          </FormGroup>
        </Form>

        <AddElementForm errors={errors} contentElements={contentElements} setContentElements={setContentElements} />

        <PostElements contentElements={contentElements} setContentElements={setContentElements} />

        <Button onClick={handleSubmit} color="primary">
          Create Post
        </Button>
      </Container>
    </Layout>
  );
};

export default CreatePost;
