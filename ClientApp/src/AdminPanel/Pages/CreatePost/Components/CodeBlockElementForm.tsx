import { useState } from "react";
import { BlogPostContentElementType, CodeBlock, ContentImage, Header, Paragraph } from "../../../../common/types";
import { ContentElements } from "../types";
import { Button, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";

interface CodeBlockElementFormProps {
  codeBlocksErrors: string[];
  setContentElements: Function;
  setElementOrderAsLastOne: (
    element: Paragraph | Header | CodeBlock | ContentImage
  ) => Paragraph | Header | CodeBlock | ContentImage;
}

const initCodeBlockState: CodeBlock = {
  content: "",
  language: "js",
  orderInBlogPost: null,
  type: BlogPostContentElementType.CODE_BLOCK,
};

const codeBlockLanguages: CodeBlock["language"][] = ["js", "cs", "html", "css"];

const CodeBlockElementForm: React.FC<CodeBlockElementFormProps> = ({
  codeBlocksErrors,
  setContentElements,
  setElementOrderAsLastOne,
}) => {
  const [codeBlockState, setCodeBlockState] = useState<CodeBlock>(initCodeBlockState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    setContentElements((prevState: ContentElements) => ({
      ...prevState,
      codeBlocks: [...prevState.codeBlocks, setElementOrderAsLastOne(codeBlockState)],
    }));
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
