import { Card, CardBody } from "reactstrap";
import { ContentElements } from "../types";

interface PostElementsProps {
  contentElements: ContentElements;
}

const PostElements: React.FC<PostElementsProps> = ({ contentElements }) => {
  return (
    <CardBody>
      {/*{contentElements.map((element) => (*/}
      {/*  <Card></Card>*/}
      {/*))}*/}
    </CardBody>
  );
};

export default PostElements;
