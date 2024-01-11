import { useState } from "react";
import { ContentImage } from "../../../../common/types";
import { ContentElements } from "../types";
import { Button, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";

interface ContentImageElementFormProps {
  contentImagesErrors: string[];
  setContentElements: Function;
}

const initContentImageState: ContentImage = {
  content: "",
  altText: "",
};

const ContentImageElementForm: React.FC<ContentImageElementFormProps> = ({
  contentImagesErrors,
  setContentElements,
}) => {
  const [contentImageState, setContentImageState] = useState<ContentImage>(initContentImageState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setContentElements((prevState: ContentElements) => ({
      ...prevState,
      contentImages: [...prevState.contentImages, contentImageState],
    }));

    if (contentImagesErrors.length === 0) setContentImageState(initContentImageState);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="content">Content</Label>
        <Input
          className="mb-2"
          invalid={Boolean(contentImagesErrors.length > 0)}
          id="content"
          type="text"
          name="content"
          value={contentImageState.content}
          onChange={(e) => setContentImageState((prevState) => ({ ...prevState, content: e.target.value }))}
        />
        {contentImagesErrors.map((errorMsg, index) => (
          <FormFeedback key={index}>{errorMsg}</FormFeedback>
        ))}
      </FormGroup>

      <FormGroup>
        <Label for="alt-text">Alt Text</Label>
        <Input
          className="mb-2"
          invalid={Boolean(contentImagesErrors.length > 0)}
          id="alt-text"
          type="text"
          name="alt-text"
          value={contentImageState.altText}
          onChange={(e) => setContentImageState((prevState) => ({ ...prevState, altText: e.target.value }))}
        />
        {contentImagesErrors.map((errorMsg, index) => (
          <FormFeedback key={index}>{errorMsg}</FormFeedback>
        ))}
      </FormGroup>
      <Button color="info">Add element</Button>
    </Form>
  );
};

export default ContentImageElementForm;
