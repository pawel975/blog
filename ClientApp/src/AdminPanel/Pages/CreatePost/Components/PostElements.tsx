import { Card, CardBody } from "reactstrap";
import { ContentElements } from "../types";

interface PostElementsProps {
  contentElements: ContentElements;
}

const PostElements: React.FC<PostElementsProps> = ({ contentElements }) => {
  const allContentElements = [
    ...contentElements.paragraphs,
    ...contentElements.headers,
    ...contentElements.codeBlocks,
    ...contentElements.contentImages,
  ];
  return (
    <CardBody className="d-grid gap-2">
      {allContentElements.map((element) => (
        <Card className="p-2 border border-secondary bg-secondary text-light ">
          <h6>{element.type}</h6>
          <p>Content: {element.content}</p>
        </Card>
      ))}
    </CardBody>
  );
};

export default PostElements;
