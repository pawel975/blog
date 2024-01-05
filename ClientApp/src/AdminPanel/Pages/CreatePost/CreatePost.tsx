import React, { useState } from "react";
import axios from "axios";
import Layout from "../../Layout/Layout";
import { Button, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { BlogPostContentElementType, CodeBlock, ContentImage, Header, Paragraph } from "../../../common/types";
import AddElementForm from "./Components/AddElementForm";

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
  contentElements: ContentElementToCreate[];
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
      contentElements: contentElements || [],
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
        const errorCategory = error.response.data.errors;

        // TODO: Create helper function based on this code
        // Check if there are any errors from API that are not handled
        Object.keys(errorCategory).forEach((category) => {
          if (!Object.keys(errors).includes(category)) {
            console.error(`Not handled category of error from API, error category - ${category}`);
          }
        });

        interface NestedError {
          index: number;
          propName: string;
          message: string;
        }

        type ParsedContentElementNestedErrors = {
          Paragraph?: NestedError[];
          Header?: NestedError[];
          CodeBlock?: NestedError[];
          ContentImage?: NestedError[];
        };

        // Errors object is like {Header[0].Level : ["Error with Level"]}
        // TODO: Test it
        const parseContentElementsNestedErrors = (errorsObj: any): ParsedContentElementNestedErrors => {
          const nestedErrorsCategories = Object.keys(errorsObj);

          const nestedErrors: any = {
            Paragraph: [],
            Header: [],
            CodeBlock: [],
            ContentImage: [],
          };

          nestedErrorsCategories.map((cat) => {
            const type = cat.match(/^[a-z]+/gi)![0];
            const index = cat.match(/\[[0-9]\]/gi)![0] as unknown as number;
            const propName = cat.match(/[a-z]+$/gi)![0];

            if (!type || index <= 0 || index === null || !propName) {
              throw new Error(`Invalid nested error categories parsing: 
              type = ${type}
              index = ${index}
              propName = ${propName}
              `);
            }

            const nestedSingleError = { index: index, propName: propName, message: errorCategory[errorsObj] };
            if (type === BlogPostContentElementType.PARAGRAPH) nestedErrors.Paragraph.push(nestedSingleError);
          });

          return nestedErrors;
        };

        try {
          setErrors({
            ...errors,
            Title: errorCategory.Title || [],
            ShortDescription: errorCategory.ShortDescription || [],
            PrimaryImageSrc: errorCategory.PrimaryImageSrc || [],
            ContentElements: {
              Paragraph: errorCategory.Paragraph
                ? [errorCategory.Paragraph, parseContentElementsNestedErrors(errorCategory).Paragraph]
                : parseContentElementsNestedErrors(errorCategory).Paragraph,
              Header: errorCategory.Header
                ? [errorCategory.Header, parseContentElementsNestedErrors(errorCategory).Header]
                : parseContentElementsNestedErrors(errorCategory).Header,
              CodeBlock: errorCategory.CodeBlock
                ? [errorCategory.CodeBlock, parseContentElementsNestedErrors(errorCategory).CodeBlock]
                : parseContentElementsNestedErrors(errorCategory).CodeBlock,
              ContentImage: errorCategory.ContentImage
                ? [errorCategory.ContentImage, parseContentElementsNestedErrors(errorCategory).ContentImage]
                : parseContentElementsNestedErrors(errorCategory).ContentImage,
            },
          });
          console.error("Failed to create post:", error.response.data.errors);
        } catch (error: any) {
          console.error("Cannot set errors state: \n error.message");
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

        <AddElementForm />

        <Button color="primary">Create Post</Button>
      </Form>
    </Layout>
  );
};

export default CreatePost;
