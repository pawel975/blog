import { useState } from "react";
import { CodeBlock } from "../../../../common/types";
import { ContentElements } from "../types";
import { Button, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";

interface CodeBlockElementFormProps {
  codeBlocksErrors: string[];
  setContentElements: Function;
  setElementOrderInBlogPost: Function;
}

const initCodeBlockState: CodeBlock = {
  content: "",
  language: "js",
  orderInBlogPost: 0,
};

const codeBlockLanguages: CodeBlock["language"][] = ["js", "cs", "html", "css"];

const CodeBlockElementForm: React.FC<CodeBlockElementFormProps> = ({
  codeBlocksErrors,
  setContentElements,
  setElementOrderInBlogPost,
}) => {
  const [codeBlockState, setCodeBlockState] = useState<CodeBlock>(initCodeBlockState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // if (codeBlockState.orderInBlogPost === 0) {
    //   console.error("OrderInBlogPost must be more than 0");
    // }

    const stateCopy = codeBlockState;
    setElementOrderInBlogPost(stateCopy);
    setCodeBlockState(stateCopy);

    setContentElements((prevState: ContentElements) => ({
      ...prevState,
      codeBlocks: [...prevState.codeBlocks, codeBlockState],
    }));

    if (codeBlocksErrors.length === 0) setCodeBlockState(initCodeBlockState);
  };

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
          invalid={Boolean(codeBlocksErrors.length > 0)}
          id="content"
          type="text"
          name="content"
          value={codeBlockState.content}
          onChange={(e) => setCodeBlockState((prevState) => ({ ...prevState, content: e.target.value }))}
        />
        {codeBlocksErrors.map((errorMsg, index) => (
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
