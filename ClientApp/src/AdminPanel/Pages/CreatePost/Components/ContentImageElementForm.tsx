import { useEffect, useState } from "react";
import { BlogPostContentElementType, ContentImage, GeneralContentElement } from "../../../../common/types";
import { ContentElements, ErrorMessages } from "../types";
import { Button, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";

interface ContentImageElementFormProps {
  setContentElements: Function;
  setElementOrderAsLastOne: (element: GeneralContentElement) => GeneralContentElement;
}

const initContentImageState: ContentImage = {
  content: "",
  altText: "",
  orderInBlogPost: null,
  type: BlogPostContentElementType.CONTENT_IMAGE,
  id: "",
};

const ContentImageElementForm: React.FC<ContentImageElementFormProps> = ({
  setContentElements,
  setElementOrderAsLastOne,
}) => {
  const [contentImageState, setContentImageState] = useState<ContentImage>(initContentImageState);
  const [submitFormErrors, setSubmitFormErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Clear errors
    setSubmitFormErrors([]);

    if (contentImageState.content.length === 0) {
      setSubmitFormErrors([...submitFormErrors, ErrorMessages.ContentRequired]);
      return;
    }
    if (contentImageState.altText.length === 0) {
      setSubmitFormErrors([...submitFormErrors, ErrorMessages.AltTextRequired]);
      return;
    }

    setContentImageState((prevState) => ({
      ...prevState,
      id: crypto.randomUUID(),
    }));

    setContentElements((prevState: ContentElements) => ({
      ...prevState,
      contentImages: [...prevState.contentImages, setElementOrderAsLastOne(contentImageState)],
    }));
  };

  useEffect(() => {
    setContentImageState((prevState) => ({
      ...prevState,
      id: crypto.randomUUID(),
    }));
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="content">Content</Label>
        <Input
          className="mb-2"
          invalid={Boolean(submitFormErrors.length > 0)}
          id="content"
          type="text"
          name="content"
          value={contentImageState.content}
          onChange={(e) => setContentImageState((prevState) => ({ ...prevState, content: e.target.value }))}
        />
        {submitFormErrors.map((errorMsg, index) => (
          <FormFeedback key={index}>{errorMsg}</FormFeedback>
        ))}
      </FormGroup>

      <FormGroup>
        <Label for="alt-text">Alt Text</Label>
        <Input
          className="mb-2"
          invalid={Boolean(submitFormErrors.length > 0)}
          id="alt-text"
          type="text"
          name="alt-text"
          value={contentImageState.altText}
          onChange={(e) => setContentImageState((prevState) => ({ ...prevState, altText: e.target.value }))}
        />
        {submitFormErrors.map((errorMsg, index) => (
          <FormFeedback key={index}>{errorMsg}</FormFeedback>
        ))}
      </FormGroup>
      <Button color="info">Add element</Button>
    </Form>
  );
};

export default ContentImageElementForm;
