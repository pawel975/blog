import React, { useState } from "react";
import axios from "axios";
import Layout from "../../Layout/Layout";
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  Collapse,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

interface ErrorsObject {
  Title: string[];
  ShortDescription: string[];
  PrimaryImageSrc: string[];
  ContentElements: string[];
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
  const [contentElements, setContentElements] = useState<ContentElementToCreate[]>([
    {
      content: "",
    },
    {
      content: "",
      level: "h2",
      language: "js",
    },
  ]);

  const [errors, setErrors] = useState<ErrorsObject>({
    Title: [],
    ShortDescription: [],
    PrimaryImageSrc: [],
    ContentElements: [],
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

    setErrors({
      Title: [],
      ShortDescription: [],
      PrimaryImageSrc: [],
      ContentElements: [],
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

        setErrors({
          ...errors,
          Title: errorCategory.Title || [],
          ShortDescription: errorCategory.ShortDescription || [],
          PrimaryImageSrc: errorCategory.PrimaryImageSrc || [],
          ContentElements: errorCategory.ContentElements || [],
        });
        console.error("Failed to create post:", error.response.data.errors);
      });
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

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

        {/* Form for Adding content elements */}
        <Form>
          <Label for="contentElements">Add elements to post</Label>
          <Row>
            <ButtonToolbar>
              <ButtonGroup>
                <Button onClick={toggle}>Header</Button>
                <Button onClick={toggle}>Paragraph</Button>
                <Button onClick={toggle}>Code</Button>
                <Button onClick={toggle}>Image</Button>
              </ButtonGroup>
            </ButtonToolbar>
            <Collapse isOpen={isOpen}>
              {/* TODO: Make here form to handle elements params, based on choosen element type */}
              <Card>
                <CardBody>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil
                  anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                </CardBody>
              </Card>
            </Collapse>
          </Row>
        </Form>
        {/* <FormGroup>
          <Label for="blogPostContent">Content Elements</Label>
          <Input
            invalid={Boolean(errors["ContentElements"].length > 0)}
            id="blogPostContent"
            type="textarea"
            name="blogPostContent"
            value={contentElements}
            onChange={(e) => setContentElements(e.target.value)}
          />
          {errors["ContentElements"].map((errorMsg, index) => (
            <FormFeedback key={index}>{errorMsg}</FormFeedback>
          ))}
        </FormGroup> */}
        <Button color="primary">Create Post</Button>
      </Form>
    </Layout>
  );
};

export default CreatePost;
