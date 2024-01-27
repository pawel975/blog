import { useEffect, useState } from "react";
import { BlogPostContentElementType, CodeBlock, GeneralContentElement } from "../../../../common/types";
import { ContentElements, ErrorMessages } from "../types";
import { Button, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import getErrorsByFieldName from "../helpers/getErrorsByFieldName";

interface CodeBlockElementFormProps {
  setContentElements: Function;
  setElementOrderAsLastOne: (element: GeneralContentElement) => GeneralContentElement;
}

interface CodeBlockError {
  errorType: "content" | "language";
  message: string;
}

const initCodeBlockState: CodeBlock = {
  content: "",
  language: "js",
  orderInBlogPost: null,
  type: BlogPostContentElementType.CODE_BLOCK,
  id: "",
};

const codeBlockLanguages: CodeBlock["language"][] = ["js", "cs", "html", "css"];

const CodeBlockElementForm: React.FC<CodeBlockElementFormProps> = ({
  setContentElements,
  setElementOrderAsLastOne,
}) => {
  const [codeBlockState, setCodeBlockState] = useState<CodeBlock>(initCodeBlockState);
  const [submitFormErrors, setSubmitFormErrors] = useState<CodeBlockError[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Clear errors
    setSubmitFormErrors(submitFormErrors.splice(0));

    if (codeBlockState.content.length === 0) {
      setSubmitFormErrors([...submitFormErrors, { errorType: "content", message: ErrorMessages.ContentRequired }]);
      return;
    }

    setCodeBlockState((prevState) => ({
      ...prevState,
      id: crypto.randomUUID(),
    }));

    setContentElements((prevState: ContentElements) => ({
      ...prevState,
      codeBlocks: [...prevState.codeBlocks, setElementOrderAsLastOne(codeBlockState)],
    }));
  };

  useEffect(() => {
    setCodeBlockState((prevState) => ({
      ...prevState,
      id: crypto.randomUUID(),
    }));
  }, []);

  const allCodeBlockLanguages = codeBlockLanguages.map((lang) => (
    <option key={lang} value={lang}>
      {lang}
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
          value={codeBlockState.content}
          onChange={(e) => setCodeBlockState((prevState) => ({ ...prevState, content: e.target.value }))}
        />
        {getErrorsByFieldName(submitFormErrors, "content").map((err, index) => (
          <FormFeedback key={index}>{err.message}</FormFeedback>
        ))}
      </FormGroup>

      <FormGroup>
        <Label for="language">Language</Label>
        <Input
          className="mb-2"
          invalid={getErrorsByFieldName(submitFormErrors, "language").length > 0}
          id="language"
          type="select"
          name="language"
          value={codeBlockState.language}
          onChange={(e) =>
            setCodeBlockState((prevState) => ({ ...prevState, language: e.target.value as CodeBlock["language"] }))
          }
        >
          {allCodeBlockLanguages}
        </Input>
      </FormGroup>
      <Button color="info">Add element</Button>
    </Form>
  );
};

export default CodeBlockElementForm;
