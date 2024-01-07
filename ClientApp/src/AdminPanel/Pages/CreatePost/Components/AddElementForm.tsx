import { Button, ButtonGroup, Card, CardBody, Collapse, Form, FormGroup, Label } from "reactstrap";
import { BlogPostContentElementType } from "../../../../common/types";
import { useState } from "react";
import CodeBlockElementForm from "./CodeBlockElementForm";
import ContentImageElementForm from "./ContentImageElementForm";
import HeaderElementForm from "./HeaderElementForm";
import ParagraphElementForm from "./ParagraphElementForm";
import FormLayout from "./FormLayout";
import { ContentElements, ErrorsObject } from "../types";

interface AddElementFormProps {
  errors: ErrorsObject;
  contentElements: ContentElements;
  setContentElements: Function;
}

const AddElementForm: React.FC<AddElementFormProps> = ({ errors, setContentElements }) => {
  const [isNewElementFormOpen, setIsNewElementFormOpen] = useState<boolean>(false);
  const [clickedNewElementType, setClickedNewElementType] = useState<string | undefined>();

  //TODO: Desctructure contentElements and pass in props prop of this object to each type of element
  const handleNewElementBtnClick = (e: React.MouseEvent<HTMLElement>): void => {
    const targetBtnType = (e.target as HTMLButtonElement).id;

    if (clickedNewElementType === targetBtnType) setIsNewElementFormOpen(!isNewElementFormOpen);
    else setIsNewElementFormOpen(true);

    setClickedNewElementType(targetBtnType);
  };

  const renderFormForElementType = (blogPostContentElementType: string) => {
    switch (blogPostContentElementType) {
      case BlogPostContentElementType.PARAGRAPH:
        return <ParagraphElementForm paragraphsErrors={errors.Paragraphs} setContentElements={setContentElements} />;
      case BlogPostContentElementType.HEADER:
        return <HeaderElementForm headersErrors={errors.Headers} setContentElements={setContentElements} />;
      case BlogPostContentElementType.CODE_BLOCK:
        return <CodeBlockElementForm codeBlocksErrors={errors.CodeBlocks} setContentElements={setContentElements} />;
      case BlogPostContentElementType.CONTENT_IMAGE:
        return (
          <ContentImageElementForm contentImagesErrors={errors.ContentImages} setContentElements={setContentElements} />
        );
      default:
        console.error(`There is no element type with name of - ${blogPostContentElementType}`);
    }
  };
  return (
    <>
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
        </FormGroup>
      </Form>
      <Collapse isOpen={isNewElementFormOpen}>
        {/* TODO: Make here form to handle elements params, based on choosen element type */}
        <Card>
          <CardBody>
            <FormLayout>{clickedNewElementType && renderFormForElementType(clickedNewElementType)}</FormLayout>
          </CardBody>
        </Card>
      </Collapse>
    </>
  );
};

export default AddElementForm;
