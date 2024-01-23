import { Alert, CardBody, Container } from "reactstrap";
import { ContentElements } from "../types";
import { ContentElement, GeneralContentElement } from "../../../../common/types";
import SinglePostElement from "./SinglePostElement";
import { SetStateAction } from "react";

interface PostElementsProps {
  contentElements: ContentElements;
  setContentElements: (elements: SetStateAction<ContentElements>) => void;
}

const PostElements: React.FC<PostElementsProps> = ({ contentElements, setContentElements }) => {
  const sortElementsByOrderInBlogPost = (elements: GeneralContentElement[]): ContentElement[] => {
    return [...elements].sort((a, b) => String(a.orderInBlogPost!).localeCompare(String(b.orderInBlogPost)));
  };

  const flatContentElements = (contentElements: ContentElements): GeneralContentElement[] => {
    //TODO: desctructure all content element types automatically
    return sortElementsByOrderInBlogPost([
      ...contentElements.paragraphs,
      ...contentElements.headers,
      ...contentElements.codeBlocks,
      ...contentElements.contentImages,
    ]);
  };

  // const segregateContentElementTypes = (elements: IndexedGeneralContentElement[]): ContentElements => {
  //   const segregatedContentElements: ContentElements = {};
  //   elements.forEach(element => {
  //     if (segregateContentElementTypes[element.type.toLowerCase()])
  //   })
  //   return segregatedContentElements;
  // };

  // TODO: change any
  const handleChangeElementPositionButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    direction: "up" | "down"
  ): void => {
    try {
      const targetElementIndex = Number((e.target as HTMLButtonElement).id);
      const firstElement = flatContentElements(contentElements).find((el) => el.orderInBlogPost! > -1);
      // Swap elements
      const arrCopy = flatContentElements(contentElements);
      const secondElementIndex: number = direction === "up" ? targetElementIndex - 1 : targetElementIndex + 1;

      let tempOrderInBlogPost = arrCopy[targetElementIndex].orderInBlogPost;
      arrCopy[targetElementIndex].orderInBlogPost = arrCopy[secondElementIndex].orderInBlogPost;
      arrCopy[secondElementIndex].orderInBlogPost = tempOrderInBlogPost;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container className="w-100 p-0 d-flex flex-column gap-1 mt-2">
      <div>
        <h3>Post elements</h3>
        <hr></hr>
      </div>
      {!flatContentElements(contentElements).length && <Alert color="info">There is not any element in post yet</Alert>}

      <CardBody className="w-50 d-flex flex-column gap-2">
        {flatContentElements(contentElements).map((element, index) => {
          console.log(element);
          return (
            <SinglePostElement
              elementProps={element}
              id={element.id}
              handleChangeElementPositionButtonClick={handleChangeElementPositionButtonClick}
            />
          );
        })}
      </CardBody>
    </Container>
  );
};

export default PostElements;
