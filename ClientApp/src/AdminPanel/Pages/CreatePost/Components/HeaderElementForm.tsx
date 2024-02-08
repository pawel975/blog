import { useEffect, useState } from "react";
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

const initHeaderState: Header = {
  content: "",
  level: "h1",
  orderInBlogPost: null,
  type: BlogPostContentElementType.HEADER,
  id: "",
};

const headingLevels: Header["level"][] = ["h1", "h2", "h3", "h4", "h5", "h6"];

const HeaderElementForm: React.FC<HeaderElementFormProps> = ({ setContentElements, setElementOrderAsLastOne }) => {
  const [headerState, setHeaderState] = useState<Header>(initHeaderState);
  const [submitFormErrors, setSubmitFormErrors] = useState<HeaderError[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Clear errors
    setSubmitFormErrors(submitFormErrors.splice(0));

    if (headerState.content.length === 0) {
      setSubmitFormErrors([...submitFormErrors, { errorType: "content", message: ErrorMessages.ContentRequired }]);
      return;
    }

    setHeaderState((prevState) => ({
      ...prevState,
      id: crypto.randomUUID(),
    }));

    setContentElements((prevState: ContentElements) => ({
      ...prevState,
      headers: [...prevState.headers, setElementOrderAsLastOne(headerState)],
    }));

    setHeaderState(initHeaderState);
  };

  useEffect(() => {
    setHeaderState((prevState) => ({
      ...prevState,
      id: crypto.randomUUID(),
    }));
  }, []);

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
          value={headerState.content}
          onChange={(e) => setHeaderState((prevState) => ({ ...prevState, content: e.target.value }))}
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
          value={headerState.level}
          onChange={(e) => setHeaderState((prevState) => ({ ...prevState, level: e.target.value as Header["level"] }))}
        >
          {allHeadingLevelOptions}
        </Input>
      </FormGroup>
      <Button color="info">Add element</Button>
    </Form>
  );
};

export default HeaderElementForm;
