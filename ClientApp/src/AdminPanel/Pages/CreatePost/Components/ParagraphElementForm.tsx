import { useState } from "react";
import { FormGroup, Label, Input, Button, Form, FormFeedback } from "reactstrap";
import { BlogPostContentElementType, GeneralContentElement, Paragraph } from "../../../../common/types";
import { ContentElements, ErrorMessages } from "../types";
import getErrorsByFieldName from "../helpers/getErrorsByFieldName";

interface ParagraphElementFormProps {
  setContentElements: Function;
  setElementOrderAsLastOne: (element: GeneralContentElement) => GeneralContentElement;
}

interface ParagraphError {
  errorType: "content";
  message: string;
}

const ParagraphElementForm: React.FC<ParagraphElementFormProps> = ({
  setContentElements,
  setElementOrderAsLastOne,
}) => {
  const initState: Paragraph = {
    content: "",
    orderInBlogPost: null,
    type: BlogPostContentElementType.PARAGRAPH,
    id: crypto.randomUUID(),
  };

  const [state, setState] = useState<Paragraph>(initState);
  const [submitFormErrors, setSubmitFormErrors] = useState<ParagraphError[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Clear errors
    setSubmitFormErrors(submitFormErrors.splice(0));

    if (state.content.length === 0) {
      setSubmitFormErrors([...submitFormErrors, { errorType: "content", message: ErrorMessages.ContentRequired }]);
      return;
    }

    setContentElements((prevState: ContentElements) => ({
      ...prevState,
      paragraphs: [...prevState.paragraphs, setElementOrderAsLastOne(state)],
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
      <Button color="info">Add element</Button>
    </Form>
  );
};

export default ParagraphElementForm;
