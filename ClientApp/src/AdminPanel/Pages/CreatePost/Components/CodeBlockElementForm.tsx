import { useEffect, useState } from "react";
import { BlogPostContentElementType, CodeBlock, GeneralContentElement } from "../../../../common/types";
import { ContentElements, ErrorMessages, NestedError } from "../types";
import { Button, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";

interface CodeBlockElementFormProps {
  codeBlocksErrors: string[];
  setContentElements: Function;
  setElementOrderAsLastOne: (element: GeneralContentElement) => GeneralContentElement;
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
  codeBlocksErrors,
  setContentElements,
  setElementOrderAsLastOne,
}) => {
  const [codeBlockState, setCodeBlockState] = useState<CodeBlock>(initCodeBlockState);
  const [submitFormErrors, setSubmitFormErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Clear errors
    setSubmitFormErrors([]);

    if (codeBlockState.content.length === 0) {
      setSubmitFormErrors([...submitFormErrors, ErrorMessages.ContentRequired]);
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
          invalid={Boolean(codeBlocksErrors.length > 0 || submitFormErrors.length > 0)}
          id="content"
          type="text"
          name="content"
          value={codeBlockState.content}
          onChange={(e) => setCodeBlockState((prevState) => ({ ...prevState, content: e.target.value }))}
        />
        {codeBlocksErrors.map((errorMsg, index) => (
          <FormFeedback key={index}>{errorMsg}</FormFeedback>
        ))}
        {submitFormErrors.map((errorMsg, index) => (
          <FormFeedback key={index}>{errorMsg}</FormFeedback>
        ))}
      </FormGroup>

      <FormGroup>
        <Label for="language">Language</Label>
        <Input
          className="mb-2"
          invalid={Boolean(codeBlocksErrors.length > 0)}
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
        {codeBlocksErrors.map((errorMsg, index) => (
          <FormFeedback key={index}>{errorMsg}</FormFeedback>
        ))}
      </FormGroup>
      <Button color="info">Add element</Button>
    </Form>
  );
};

export default CodeBlockElementForm;
