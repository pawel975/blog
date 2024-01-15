import { useState } from "react";
import { FormGroup, Label, Input, Button, Form, FormFeedback } from "reactstrap";
import { Paragraph } from "../../../../common/types";
import { ContentElements } from "../types";

interface ParagraphElementFormProps {
  paragraphsErrors: string[];
  setContentElements: Function;
  setElementOrderInBlogPost: Function;
}

const initParagraphState: Paragraph = {
  content: "",
  orderInBlogPost: 0,
};

const ParagraphElementForm: React.FC<ParagraphElementFormProps> = ({
  paragraphsErrors,
  setContentElements,
  setElementOrderInBlogPost,
}) => {
  const [paragraphState, setParagraphState] = useState<Paragraph>(initParagraphState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (paragraphState.orderInBlogPost === 0) {
      console.error("OrderInBlogPost must be more than 0");
    }

    const stateCopy = paragraphState;
    setElementOrderInBlogPost(stateCopy);
    setParagraphState(stateCopy);

    setContentElements((prevState: ContentElements) => ({
      ...prevState,
      paragraphs: [...prevState.paragraphs, paragraphState],
    }));

    if (paragraphsErrors.length === 0) setParagraphState(initParagraphState);
  };

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
