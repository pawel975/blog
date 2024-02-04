import { useState } from "react";
import {
  BlogPostContentElementType,
  ContentElements,
  ContentImage,
  GeneralContentElement,
} from "../../../../common/types";
import { ErrorMessages } from "../types";
import { Button, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import getErrorsByFieldName from "../utils/getErrorsByFieldName";

interface ContentImageElementFormProps {
  setContentElements: Function;
  setElementOrderAsLastOne: (element: GeneralContentElement) => GeneralContentElement;
}

interface ContentImageError {
  errorType: "content" | "altText";
  message: string;
}

const ContentImageElementForm: React.FC<ContentImageElementFormProps> = ({
  setContentElements,
  setElementOrderAsLastOne,
}) => {
  const initState: ContentImage = {
    content: "",
    altText: "",
    orderInBlogPost: null,
    type: BlogPostContentElementType.CONTENT_IMAGE,
    id: crypto.randomUUID(),
  };

  const [state, setState] = useState<ContentImage>(initState);
  const [submitFormErrors, setSubmitFormErrors] = useState<ContentImageError[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Clear errors
    setSubmitFormErrors(submitFormErrors.splice(0));

    const tempSubmitErrors: ContentImageError[] = [...submitFormErrors];

    if (state.content.length === 0) {
      tempSubmitErrors.push({ errorType: "content", message: ErrorMessages.ContentRequired });
    }
    if (state.altText.length === 0) {
      tempSubmitErrors.push({ errorType: "altText", message: ErrorMessages.AltTextRequired });
    }

    setSubmitFormErrors(tempSubmitErrors);

    if (tempSubmitErrors.length > 0) return;

    setContentElements((prevState: ContentElements) => ({
      ...prevState,
      contentImages: [...prevState.contentImages, setElementOrderAsLastOne(state)],
    }));

    setState(initState);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="content">Content</Label>
        <Input
          className="mb-2"
          invalid={getErrorsByFieldName(submitFormErrors, "content").length > 0}
          id="content"
          type="text"
          name="content"
          value={state.content}
          onChange={(e) => setState((prevState) => ({ ...prevState, content: e.target.value }))}
        />
        {getErrorsByFieldName(submitFormErrors, "content").map((err, index) => (
          <FormFeedback key={index}>{err.message}</FormFeedback>
        ))}
      </FormGroup>

      <FormGroup>
        <Label for="alt-text">Alt Text</Label>
        <Input
          className="mb-2"
          invalid={getErrorsByFieldName(submitFormErrors, "altText").length > 0}
          id="alt-text"
          type="text"
          name="alt-text"
          value={state.altText}
          onChange={(e) => setState((prevState) => ({ ...prevState, altText: e.target.value }))}
        />
        {getErrorsByFieldName(submitFormErrors, "altText").map((err, index) => (
          <FormFeedback key={index}>{err.message}</FormFeedback>
        ))}
      </FormGroup>
      <Button color="info">Add element</Button>
    </Form>
  );
};

export default ContentImageElementForm;
