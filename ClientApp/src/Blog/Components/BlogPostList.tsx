import { Card, CardBody, CardText, CardTitle, Container } from "reactstrap";
import { BlogPostContent } from "../../common/types";
import { Link } from "react-router-dom";

interface BlogPostListInterface {
  blogPosts: BlogPostContent[];
}

const BlogPostList: React.FC<BlogPostListInterface> = ({ blogPosts }) => {
  const blogPostPreviewCards = blogPosts.map((bp) => {
    const { id, title, shortDescription, primaryImageSrc } = bp;
    return (
      <Link to={`/blog/post/${id}`}>
        <Card className="d-flex flex-row w-50 border border-dark rounded">
          <img style={{ width: "50%" }} src={primaryImageSrc} alt="post ilustration" />
          <CardBody>
            <CardTitle>{title}</CardTitle>
            <CardText>{shortDescription}</CardText>
          </CardBody>
        </Card>
      </Link>
    );
  });

  return <Container className="d-flex">{blogPostPreviewCards}</Container>;
};

export default BlogPostList;
