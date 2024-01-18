import { useState } from "react";
import { BlogPostContentElementType, CodeBlock, ContentImage, Header, Paragraph } from "../../../../common/types";
import { ContentElements } from "../types";
import { Button, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";

interface HeaderElementFormProps {
  headersErrors: string[];
  setContentElements: Function;
  setElementOrderAsLastOne: (
    element: Paragraph | Header | CodeBlock | ContentImage
  ) => Paragraph | Header | CodeBlock | ContentImage;
}

const initHeaderState: Header = {
  content: "",
  level: "h1",
  orderInBlogPost: null,
  type: BlogPostContentElementType.HEADER,
};

const headingLevels: Header["level"][] = ["h1", "h2", "h3", "h4", "h5", "h6"];

const HeaderElementForm: React.FC<HeaderElementFormProps> = ({
  headersErrors,
  setContentElements,
  setElementOrderAsLastOne,
}) => {
  const [headerState, setHeaderState] = useState<Header>(initHeaderState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    setContentElements((prevState: ContentElements) => ({
      ...prevState,
      headers: [...prevState.headers, setElementOrderAsLastOne(headerState)],
    }));
  };

  const allHeadingLevelOptions = headingLevels.map((lvl) => (
    <option key={lvl} value={lvl}>
      {lvl}
    </option>
  ));

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="content">Content</Label>
        <Input
          className="mb-2"
          invalid={Boolean(headersErrors.length > 0)}
          id="content"
          type="text"
          name="content"
          value={headerState.content}
          onChange={(e) => setHeaderState((prevState) => ({ ...prevState, content: e.target.value }))}
        />
        {headersErrors.map((errorMsg, index) => (
          <FormFeedback key={index}>{errorMsg}</FormFeedback>
        ))}
      </FormGroup>

      <FormGroup>
        <Label for="level">Heading level</Label>
        <Input
          className="mb-2"
          invalid={Boolean(headersErrors.length > 0)}
          id="level"
          type="select"
          name="level"
          value={headerState.level}
          onChange={(e) => setHeaderState((prevState) => ({ ...prevState, level: e.target.value as Header["level"] }))}
        >
          {allHeadingLevelOptions}
        </Input>

        {headersErrors.map((errorMsg, index) => (
          <FormFeedback key={index}>{errorMsg}</FormFeedback>
        ))}
      </FormGroup>
      <Button color="info">Add element</Button>
    </Form>
  );
};

export default HeaderElementForm;
