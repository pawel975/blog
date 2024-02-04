import { Card, CardBody, CardText, CardTitle, Container } from "reactstrap";
import { Link } from "react-router-dom";
import { BlogPost } from "../../../data/model/BlogPostModel";

interface BlogPostListInterface {
  blogPosts: BlogPost[];
}

const BlogPostList: React.FC<BlogPostListInterface> = ({ blogPosts }) => {
  const blogPostPreviewCards = blogPosts.map((bp, index) => {
    const { id, title, shortDescription, primaryImageSrc } = bp;
    return (
      <Link className="removed-underline" key={index} to={`/blog/post/${id}`}>
        <Card className="d-flex flex-row w-50 emphasized-border">
          <img style={{ width: "50%" }} src={primaryImageSrc} alt="post ilustration" />
          <CardBody>
            <CardTitle className="fs-700 p-0 own-text-accent blog-header">{title}</CardTitle>
            <CardText className=" fs-400">{shortDescription}</CardText>
          </CardBody>
        </Card>
      </Link>
    );
  });

  return <Container className="d-flex p-0">{blogPostPreviewCards}</Container>;
};

export default BlogPostList;
