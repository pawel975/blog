import { useState } from "react";
import { Header } from "../../../../common/types";
import { ContentElements } from "../types";
import { Button, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";

interface HeaderElementFormProps {
  headersErrors: string[];
  setContentElements: Function;
  setElementOrderInBlogPost: Function;
}

const initHeaderState: Header = {
  content: "",
  level: "h1",
  orderInBlogPost: 0,
};

const headingLevels: Header["level"][] = ["h1", "h2", "h3", "h4", "h5", "h6"];

const HeaderElementForm: React.FC<HeaderElementFormProps> = ({
  headersErrors,
  setContentElements,
  setElementOrderInBlogPost,
}) => {
  const [headerState, setHeaderState] = useState<Header>(initHeaderState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (headerState.orderInBlogPost === 0) {
      console.error("OrderInBlogPost must be more than 0");
    }

    const stateCopy = headerState;
    setElementOrderInBlogPost(stateCopy);
    setHeaderState(stateCopy);

    setContentElements((prevState: ContentElements) => ({
      ...prevState,
      headers: [...prevState.headers, headerState],
    }));

    if (headersErrors.length === 0) setHeaderState(initHeaderState);
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
