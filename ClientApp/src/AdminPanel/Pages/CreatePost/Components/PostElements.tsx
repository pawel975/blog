import { Alert, CardBody, Container } from "reactstrap";
import { ContentElements } from "../types";
import { ContentElement, GeneralContentElement, IndexedGeneralContentElement } from "../../../../common/types";
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

  const segregateContentElementTypes = (elements: IndexedGeneralContentElement[]): ContentElements => {
    const segregatedContentElements: ContentElements = {
      paragraphs: [],
      headers: [],
      codeBlocks: [],
      contentImages: [],
    };
    elements.forEach((element) => {
      //TODO: make error handling here
      const type = element.type[0].toLowerCase() + element.type.slice(1) + "s";
      segregatedContentElements[type].push(element);
    });
    return segregatedContentElements;
  };

  // TODO: change any
  const handleChangeElementPositionButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    direction: "up" | "down"
  ): void => {
    try {
      const allContentElements = flatContentElements(contentElements);
      const targetElementId = String((e.target as HTMLButtonElement).id);

      // First element in blog post
      const firstElementToSwap = allContentElements.find((el) => el.id === targetElementId);

      if (!firstElementToSwap) {
        throw new Error(`Cannot find element to swap with id of: ${targetElementId}`);
      }

      const firstElementOrderInblogPost = firstElementToSwap.orderInBlogPost;

      // Second Element in blog post
      const secondElementOrderInBlogPost =
        direction === "up" ? firstElementToSwap.orderInBlogPost! - 1 : firstElementToSwap.orderInBlogPost! + 1;
      const secondElementToSwap = allContentElements.find((el) => el.orderInBlogPost === secondElementOrderInBlogPost);

      if (!secondElementToSwap) {
        throw new Error(`Cannot find element to swap with id of: ${targetElementId}`);
      }

      // // Indeces of elements to swap
      // const firstElementToSwapIndex = allContentElements.indexOf(firstElementToSwap);
      // const secondElementToSwapIndex = allContentElements.indexOf(secondElementToSwap);

      // Swap order in blog post for both elements
      let tempOrderInBlogPost = firstElementOrderInblogPost;
      firstElementToSwap.orderInBlogPost = secondElementOrderInBlogPost;
      secondElementToSwap.orderInBlogPost = tempOrderInBlogPost;

      setContentElements(segregateContentElementTypes(allContentElements));
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
