import { useEffect, useState } from "react";
import { FormGroup, Label, Input, Button, Form, FormFeedback } from "reactstrap";
import { BlogPostContentElementType, GeneralContentElement, Paragraph } from "../../../../common/types";
import { ContentElements } from "../types";

interface ParagraphElementFormProps {
  paragraphsErrors: string[];
  setContentElements: Function;
  setElementOrderAsLastOne: (element: GeneralContentElement) => GeneralContentElement;
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    setParagraphState((prevState) => ({
      ...prevState,
      id: crypto.randomUUID(),
    }));

    setContentElements((prevState: ContentElements) => ({
      ...prevState,
      paragraphs: [...prevState.paragraphs, setElementOrderAsLastOne(paragraphState)],
    }));
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
          invalid={Boolean(paragraphsErrors.length > 0)}
          id="content"
          type="text"
          name="content"
          value={paragraphState.content}
          onChange={(e) => setParagraphState((prevState) => ({ ...prevState, content: e.target.value }))}
        />
        {paragraphsErrors.map((errorMsg, index) => (
          <FormFeedback key={index}>{errorMsg}</FormFeedback>
        ))}
      </FormGroup>
      <Button color="info">Add element</Button>
    </Form>
  );
};

export default ParagraphElementForm;
