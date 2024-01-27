import { useEffect, useState } from "react";
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

const initParagraphState: Paragraph = {
  content: "",
  orderInBlogPost: null,
  type: BlogPostContentElementType.PARAGRAPH,
  id: crypto.randomUUID(),
};

const ParagraphElementForm: React.FC<ParagraphElementFormProps> = ({
  setContentElements,
  setElementOrderAsLastOne,
}) => {
  const [paragraphState, setParagraphState] = useState<Paragraph>(initParagraphState);
  const [submitFormErrors, setSubmitFormErrors] = useState<ParagraphError[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Clear errors
    setSubmitFormErrors(submitFormErrors.splice(0));

    if (paragraphState.content.length === 0) {
      setSubmitFormErrors([...submitFormErrors, { errorType: "content", message: ErrorMessages.ContentRequired }]);
      return;
    }

    setParagraphState((prevState) => ({
      ...prevState,
      id: crypto.randomUUID(),
    }));

    setContentElements((prevState: ContentElements) => ({
      ...prevState,
      paragraphs: [...prevState.paragraphs, setElementOrderAsLastOne(paragraphState)],
    }));

    setParagraphState(initParagraphState);
  };

  useEffect(() => {
    setParagraphState((prevState) => ({
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
          invalid={getErrorsByFieldName(submitFormErrors, "content").length > 0}
          id="content"
          type="text"
          name="content"
          value={paragraphState.content}
          onChange={(e) => setParagraphState((prevState) => ({ ...prevState, content: e.target.value }))}
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
