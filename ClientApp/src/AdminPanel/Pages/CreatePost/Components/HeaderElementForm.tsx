import { useState } from "react";
import { BlogPostContentElementType, GeneralContentElement, Header } from "../../../../common/types";
import { ContentElements, ErrorMessages } from "../types";
import { Button, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import getErrorsByFieldName from "../helpers/getErrorsByFieldName";

interface HeaderElementFormProps {
  setContentElements: Function;
  setElementOrderAsLastOne: (element: GeneralContentElement) => GeneralContentElement;
}

interface HeaderError {
  errorType: "content" | "level";
  message: string;
}

const headingLevels: Header["level"][] = ["h1", "h2", "h3", "h4", "h5", "h6"];

const HeaderElementForm: React.FC<HeaderElementFormProps> = ({ setContentElements, setElementOrderAsLastOne }) => {
  const initstate: Header = {
    content: "",
    level: "h1",
    orderInBlogPost: null,
    type: BlogPostContentElementType.HEADER,
    id: crypto.randomUUID(),
  };

  const [state, setState] = useState<Header>(initstate);
  const [submitFormErrors, setSubmitFormErrors] = useState<HeaderError[]>([]);

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
      headers: [...prevState.headers, setElementOrderAsLastOne(state)],
    }));

    setState(initstate);
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
        <Label for="level">Heading level</Label>
        <Input
          className="mb-2"
          invalid={getErrorsByFieldName(submitFormErrors, "level").length > 0}
          id="level"
          type="select"
          name="level"
          value={state.level}
          onChange={(e) => setState((prevState) => ({ ...prevState, level: e.target.value as Header["level"] }))}
        >
          {allHeadingLevelOptions}
        </Input>
      </FormGroup>
      <Button color="info">Add element</Button>
    </Form>
  );
};

export default HeaderElementForm;
