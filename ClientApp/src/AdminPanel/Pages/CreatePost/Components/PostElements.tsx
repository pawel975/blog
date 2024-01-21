import { Card, CardBody, Container } from "reactstrap";
import { ContentElements } from "../types";
import shortenLongString from "../helpers/shortenLongString";
import { ContentElement, GeneralContentElement } from "../../../../common/types";

interface PostElementsProps {
  contentElements: ContentElements;
}

const PostElements: React.FC<PostElementsProps> = ({ contentElements }) => {
  const sortElementsByOrderInBlogPost = (elements: GeneralContentElement[]): ContentElement[] => {
    return [...elements].sort((a, b) => String(a.orderInBlogPost!).localeCompare(String(b.orderInBlogPost)));
  };

  const allContentElements = sortElementsByOrderInBlogPost([
    ...contentElements.paragraphs,
    ...contentElements.headers,
    ...contentElements.codeBlocks,
    ...contentElements.contentImages,
  ]);

  return (
    <Container className="w-100 p-0 d-flex flex-column gap-1 mt-2">
      <div>
        <h3>Post elements</h3>
        <hr></hr>
      </div>
      <CardBody className="w-50 d-flex flex-column gap-2">
        {allContentElements.map((element, index) => (
          <Card key={element.type + index} className="w-100 p-3 m-auto text-dark">
            <h6>Type: {shortenLongString(element.type)}</h6>
            <p className="m-0">Content: {shortenLongString(element.content)}</p>
          </Card>
        ))}
      </CardBody>
    </Container>
  );
};

export default PostElements;
