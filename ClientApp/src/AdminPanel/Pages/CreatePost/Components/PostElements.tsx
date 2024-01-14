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

  console.log(allContentElements);
  return (
    <CardBody>
      {allContentElements.map((element) => (
        <Card>{element["content"]}</Card>
      ))}
    </CardBody>
  );
};

export default PostElements;
