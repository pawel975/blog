import React, { useState } from "react";
import axios from "axios";
import Layout from "../../Layout/Layout";
import { Button, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { CodeBlock, ContentImage, Header, Paragraph } from "../../../common/types";
import AddElementForm from "./Components/AddElementForm";
import parseContentElementsNestedErrors from "./helpers/parseContentElementsNestedErrors";

interface ErrorsObject {
  Title: string[];
  ShortDescription: string[];
  PrimaryImageSrc: string[];
  ContentElements: {
    // TODO: Change any
    Paragraph: any;
    Header: any;
    CodeBlock: any;
    ContentImage: any;
  };
}

interface FormData {
  title: string;
  shortDescription: string;
  primaryImageSrc: string;
}

type ContentElementToCreate = Paragraph | Header | CodeBlock | ContentImage;

const CreatePost: React.FC = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [shortDescription, setShortDescription] = useState<string>("");
  const [primaryImageSrc, setPrimaryImageSrc] = useState<string>("");
  const [contentElements, setContentElements] = useState<ContentElementToCreate[]>([]);

  const [errors, setErrors] = useState<ErrorsObject>({
    Title: [],
    ShortDescription: [],
    PrimaryImageSrc: [],
    ContentElements: {
      Paragraph: [],
      Header: [],
      CodeBlock: [],
      ContentImage: [],
    },
  });

  // TODO: change any
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData: FormData = {
      title: title || "",
      shortDescription: shortDescription || "",
      primaryImageSrc: primaryImageSrc || "",
    };

    // Erase previous errors
    errors &&
      setErrors({
        Title: [],
        ShortDescription: [],
        PrimaryImageSrc: [],
        ContentElements: {
          Paragraph: [],
          Header: [],
          CodeBlock: [],
          ContentImage: [],
        },
      });

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
        Object.keys(errorCategories).forEach((category) => {
          if (!Object.keys(errors).includes(category)) {
            console.error(`Not handled category of error from API, error category - ${category}`);
          }
        });

        try {
          const parsedErrors = parseContentElementsNestedErrors(errorCategories);

          console.log(parsedErrors, "parsedErrors");
          setErrors({
            ...errors,
            Title: errorCategories.Title || [],
            ShortDescription: errorCategories.ShortDescription || [],
            PrimaryImageSrc: errorCategories.PrimaryImageSrc || [],
            ContentElements: {
              Paragraph: errorCategories.Paragraph
                ? [errorCategories.Paragraph, parsedErrors.Paragraph]
                : parsedErrors.Paragraph,
              Header: errorCategories.Header ? [errorCategories.Header, parsedErrors.Header] : parsedErrors.Header,
              CodeBlock: errorCategories.CodeBlock
                ? [errorCategories.CodeBlock, parsedErrors.CodeBlock]
                : parsedErrors.CodeBlock,
              ContentImage: errorCategories.ContentImage
                ? [errorCategories.ContentImage, parsedErrors.ContentImage]
                : parsedErrors.ContentImage,
            },
          });
          console.error("Failed to create post:", error.response.data.errors);
        } catch (error: any) {
          console.error("Cannot set errors state\n", error);
        }
      });
  };

  return (
    <Layout header="Create Post">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            invalid={Boolean(errors["Title"].length > 0)}
            id="title"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors["Title"].map((errorMsg, index) => (
            <FormFeedback key={index}>{errorMsg}</FormFeedback>
          ))}
        </FormGroup>

        <FormGroup>
          <Label for="shortDescription">Short Description</Label>
          <Input
            invalid={Boolean(errors["ShortDescription"].length > 0)}
            type="text"
            id="shortDescription"
            name="shortDescription"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
          />
          {errors["ShortDescription"].map((errorMsg, index) => (
            <FormFeedback key={index}>{errorMsg}</FormFeedback>
          ))}
        </FormGroup>

        <FormGroup>
          <Label for="primaryImageSrc">Primary Image Source</Label>
          <Input
            invalid={Boolean(errors["PrimaryImageSrc"].length > 0)}
            id="primaryImageSrc"
            type="text"
            name="primaryImageSrc"
            value={primaryImageSrc}
            onChange={(e) => setPrimaryImageSrc(e.target.value)}
          />
          {errors["PrimaryImageSrc"].map((errorMsg, index) => (
            <FormFeedback key={index}>{errorMsg}</FormFeedback>
          ))}
        </FormGroup>

        <Button color="primary">Create Post</Button>
      </Form>
      {/* TODO: Cannot nest forms, I need to add mechanism of sending*/}
      <AddElementForm />
    </Layout>
  );
};

export default CreatePost;
