import { useEffect, useState } from "react";
import { FormGroup, Label, Input, Button, Form, FormFeedback } from "reactstrap";
import { BlogPostContentElementType, GeneralContentElement, Paragraph } from "../../../../common/types";
import { ContentElements, ErrorMessages } from "../types";

interface ParagraphElementFormProps {
  paragraphsErrors: string[];
  setContentElements: Function;
  setElementOrderAsLastOne: (element: GeneralContentElement) => GeneralContentElement;
}

interface ParagraphError {
  fieldName: "content";
  message: string;
}

const initParagraphState: Paragraph = {
  content: "",
  orderInBlogPost: null,
  type: BlogPostContentElementType.PARAGRAPH,
  id: crypto.randomUUID(),
};

const ParagraphElementForm: React.FC<ParagraphElementFormProps> = ({
  paragraphsErrors,
  setContentElements,
  setElementOrderAsLastOne,
}) => {
  const [paragraphState, setParagraphState] = useState<Paragraph>(initParagraphState);
  const [submitFormErrors, setSubmitFormErrors] = useState<ParagraphError[]>([]);

  const getErrorsByFieldName = (errors: ParagraphError[], fieldName: ParagraphError["fieldName"]) =>
    errors.filter((err) => err.fieldName === fieldName);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Clear errors
    setSubmitFormErrors([]);

    if (paragraphState.content.length === 0) {
      setSubmitFormErrors([...submitFormErrors, { fieldName: "content", message: ErrorMessages.ContentRequired }]);
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
          invalid={Boolean(paragraphsErrors.length > 0 || getErrorsByFieldName(submitFormErrors, "content").length > 0)}
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
      {/* TODO: create custom css class that will make same color as form feedback, outside form */}
      {paragraphsErrors.map((errorMsg, index) => (
        <div className="invalid-feedback" key={index}>
          {errorMsg}
        </div>
      ))}
      <Button color="info">Add element</Button>
    </Form>
  );
};

export default ParagraphElementForm;
