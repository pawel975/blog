import { Button, ButtonGroup, Card, CardBody, Collapse, Form, FormGroup, Label } from "reactstrap";
import { BlogPostContentElementType } from "../../../../common/types";
import { useState } from "react";
import CodeBlockElementForm from "./CodeBlockElementForm";
import ContentImageElementForm from "./ContentImageElementForm";
import HeaderElementForm from "./HeaderElementForm";
import ParagraphElementForm from "./ParagraphElementForm";

const AddElementForm: React.FC = () => {
  const [isNewElementFormOpen, setIsNewElementFormOpen] = useState(false);
  const [clickedNewElementType, setClickedNewElementType] = useState<string | undefined>();

  const handleNewElementBtnClick = (e: React.MouseEvent<HTMLElement>): void => {
    const targetBtnType = (e.target as HTMLButtonElement).id;

    if (clickedNewElementType === targetBtnType) setIsNewElementFormOpen(!isNewElementFormOpen);
    else setIsNewElementFormOpen(true);

    setClickedNewElementType(targetBtnType);
  };

  const renderFormForElementType = (blogPostContentElementType: string) => {
    switch (blogPostContentElementType) {
      case BlogPostContentElementType.PARAGRAPH:
        return <ParagraphElementForm />;
      case BlogPostContentElementType.HEADER:
        return <HeaderElementForm />;
      case BlogPostContentElementType.CODE_BLOCK:
        return <CodeBlockElementForm />;
      case BlogPostContentElementType.CONTENT_IMAGE:
        return <ContentImageElementForm />;
      default:
        console.error(`There is no element type with name of - ${blogPostContentElementType}`);
    }
  };
  return (
    <Form>
      <Label>Add elements to post</Label>
      <FormGroup>
        <ButtonGroup className="mb-2">
          <Button id={BlogPostContentElementType.HEADER} onClick={handleNewElementBtnClick}>
            Header
          </Button>
          <Button id={BlogPostContentElementType.PARAGRAPH} onClick={handleNewElementBtnClick}>
            Paragraph
          </Button>
          <Button id={BlogPostContentElementType.CODE_BLOCK} onClick={handleNewElementBtnClick}>
            Code
          </Button>
          <Button id={BlogPostContentElementType.CONTENT_IMAGE} onClick={handleNewElementBtnClick}>
            Image
          </Button>
        </ButtonGroup>

        <Collapse isOpen={isNewElementFormOpen}>
          {/* TODO: Make here form to handle elements params, based on choosen element type */}
          <Card>
            <CardBody>{clickedNewElementType && renderFormForElementType(clickedNewElementType)}</CardBody>
          </Card>
        </Collapse>
      </FormGroup>
    </Form>
  );
};

export default AddElementForm;
