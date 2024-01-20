import { Card, CardBody } from "reactstrap";
import { ContentElements } from "../types";

interface PostElementsProps {
  contentElements: ContentElements;
}

const PostElements: React.FC<PostElementsProps> = ({ contentElements }) => {
  const NOT_AVAILABLE = "N/A";

  const allContentElements = [
    ...contentElements.paragraphs,
    ...contentElements.headers,
    ...contentElements.codeBlocks,
    ...contentElements.contentImages,
  ];
  return (
    <CardBody className="w-100 d-flex flex-column align-items-start gap-2">
      {allContentElements.map((element, index) => (
        <Card key={element.type + index} className="p-3 text-dark">
          <h6>Type: {element.type || NOT_AVAILABLE}</h6>
          <p>Content: {element.content || NOT_AVAILABLE}</p>
        </Card>
      ))}
    </CardBody>
  );
};

export default PostElements;
