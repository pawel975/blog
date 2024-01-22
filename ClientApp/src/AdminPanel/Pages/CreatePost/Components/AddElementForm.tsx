import { Button, ButtonGroup, Card, CardBody, Collapse, Container, Form, FormGroup, Label } from "reactstrap";
import { BlogPostContentElementType, GeneralContentElement } from "../../../../common/types";
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

const AddElementForm: React.FC<AddElementFormProps> = ({ errors, contentElements, setContentElements }) => {
  const [isNewElementFormOpen, setIsNewElementFormOpen] = useState<boolean>(false);
  const [clickedNewElementType, setClickedNewElementType] = useState<string | undefined>();

  //TODO: Desctructure contentElements and pass in props prop of this object to each type of element
  const handleNewElementBtnClick = (e: React.MouseEvent<HTMLElement>): void => {
    const targetBtnType = (e.target as HTMLButtonElement).id;

    if (clickedNewElementType === targetBtnType) setIsNewElementFormOpen(!isNewElementFormOpen);
    else setIsNewElementFormOpen(true);

    setClickedNewElementType(targetBtnType);
  };

  /**
   *
   * @param element
   * @returns copy of element with set OrderInBlogPost as last
   */
  const setElementOrderAsLastOne = (element: GeneralContentElement): GeneralContentElement => {
    let elementOrder = 0;

    const elementCopy = Object.assign({}, element);

    // Reads count of elements
    const allCategories = Object.keys(contentElements);
    allCategories.forEach((cat: string) => {
      elementOrder += contentElements[cat].length;
    });

    // Sets element order as a last one
    elementCopy.orderInBlogPost = elementOrder;

    return elementCopy;
  };

  const renderFormForElementType = (blogPostContentElementType: string) => {
    switch (blogPostContentElementType) {
      case BlogPostContentElementType.PARAGRAPH:
        return (
          <ParagraphElementForm
            paragraphsErrors={errors.Paragraphs}
            setContentElements={setContentElements}
            setElementOrderAsLastOne={setElementOrderAsLastOne}
          />
        );
      case BlogPostContentElementType.HEADER:
        return (
          <HeaderElementForm
            headersErrors={errors.Headers}
            setContentElements={setContentElements}
            setElementOrderAsLastOne={setElementOrderAsLastOne}
          />
        );
      case BlogPostContentElementType.CODE_BLOCK:
        return (
          <CodeBlockElementForm
            codeBlocksErrors={errors.CodeBlocks}
            setContentElements={setContentElements}
            setElementOrderAsLastOne={setElementOrderAsLastOne}
          />
        );
      case BlogPostContentElementType.CONTENT_IMAGE:
        return (
          <ContentImageElementForm
            contentImagesErrors={errors.ContentImages}
            setContentElements={setContentElements}
            setElementOrderAsLastOne={setElementOrderAsLastOne}
          />
        );
      default:
        console.error(`There is no element type with name of - ${blogPostContentElementType}`);
    }
  };
  return (
    <Container className="d-flex flex-column p-0">
      <Form>
        <Label>Add elements to post</Label>
        <FormGroup>
          <ButtonGroup>
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
      <Collapse className="w-100" isOpen={isNewElementFormOpen}>
        {/* TODO: Make here form to handle elements params, based on choosen element type */}
        <Card>
          <CardBody>
            <FormLayout>{clickedNewElementType && renderFormForElementType(clickedNewElementType)}</FormLayout>
          </CardBody>
        </Card>
      </Collapse>
    </Container>
  );
};

export default AddElementForm;
