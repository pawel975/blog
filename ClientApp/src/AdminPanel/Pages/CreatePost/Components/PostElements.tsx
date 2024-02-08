import { Alert, CardBody, Container } from "reactstrap";
import { ContentElements, GeneralContentElement } from "../../../../common/types";
import SinglePostElement from "./SinglePostElement";
import { SetStateAction } from "react";
import flatContentElements from "../../../../common/utils/flatContentElements";
import groupContentElements from "../../../../common/utils/groupContentElements";

interface PostElementsProps {
  contentElements: ContentElements;
  setContentElements: (elements: SetStateAction<ContentElements>) => void;
}

const PostElements: React.FC<PostElementsProps> = ({ contentElements, setContentElements }) => {
  const updateOrderOfContentElements = (elements: GeneralContentElement[]): GeneralContentElement[] => {
    const updateOrderElements = elements.map((element, index) => {
      element.orderInBlogPost = index;
      return element;
    });
    return updateOrderElements;
  };

  const handleChangeElementPositionButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    direction: "up" | "down"
  ): void => {
    try {
      const allContentElements = flatContentElements(contentElements);
      const targetElementId = String((e.target as HTMLButtonElement).id);

      // First element to swap in blog post
      const firstElementToSwap = allContentElements.find((el) => el.id === targetElementId);

      if (!firstElementToSwap) {
        throw new Error(`Cannot find element to swap`);
      }

      const firstElementOrderInblogPost = firstElementToSwap.orderInBlogPost;

      // Second Element to swap in blog post
      const secondElementOrderInBlogPost =
        direction === "up" ? firstElementToSwap.orderInBlogPost! - 1 : firstElementToSwap.orderInBlogPost! + 1;
      const secondElementToSwap = allContentElements.find((el) => el.orderInBlogPost === secondElementOrderInBlogPost);

      if (!secondElementToSwap) {
        throw new Error(`Cannot find element to swap places, attempt to go out of range`);
      }

      // Swap order in blog post for both elements
      let tempOrderInBlogPost = firstElementOrderInblogPost;
      firstElementToSwap.orderInBlogPost = secondElementOrderInBlogPost;
      secondElementToSwap.orderInBlogPost = tempOrderInBlogPost;

      setContentElements(groupContentElements(allContentElements));
    } catch (err) {
      console.error(err);
    }
  };

  const handleElementDelete = (e: React.MouseEvent<HTMLElement>): void => {
    const targetId = (e.target as HTMLElement).id;
    setContentElements(
      groupContentElements(
        updateOrderOfContentElements(flatContentElements(contentElements).filter((element) => element.id !== targetId))
      )
    );
  };

  return (
    <Container className="w-100 p-0 d-flex flex-column gap-1 mt-2">
      <div>
        <h3>Post elements</h3>
        <hr></hr>
      </div>
      {!flatContentElements(contentElements).length && <Alert color="info">There is not any element in post yet</Alert>}

      <CardBody className="w-50 d-flex flex-column gap-2">
        {flatContentElements(contentElements).map((element) => {
          return (
            <SinglePostElement
              key={element.id}
              elementProps={element}
              id={element.id}
              lastElementOrderInBlogPost={flatContentElements(contentElements).length - 1}
              handleChangeElementPositionButtonClick={handleChangeElementPositionButtonClick}
              handleElementDelete={handleElementDelete}
            />
          );
        })}
      </CardBody>
    </Container>
  );
};

export default PostElements;
