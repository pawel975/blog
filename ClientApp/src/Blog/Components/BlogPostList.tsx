import { Card, CardBody, CardText, CardTitle, Container } from "reactstrap";
import { Link } from "react-router-dom";
import { BlogPost } from "../../data/model/BlogPostModel";

interface BlogPostListInterface {
  blogPosts: BlogPost[];
}

const BlogPostList: React.FC<BlogPostListInterface> = ({ blogPosts }) => {
  const blogPostPreviewCards = blogPosts.map((bp, index) => {
    const { id, title, shortDescription, primaryImageSrc } = bp;
    return (
      <Link key={index} to={`/blog/post/${id}`}>
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
