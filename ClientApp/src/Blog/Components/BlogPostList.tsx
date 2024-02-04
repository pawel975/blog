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
      <Link key={index} to={`/blog/post/${id}`} style={{ textDecoration: "none" }}>
        <Card className="d-flex flex-row w-50 emphasized-border">
          <img style={{ width: "50%" }} src={primaryImageSrc} alt="post ilustration" />
          <CardBody>
            <CardTitle className="own-bg-secondary p-1 own-text-accent blog-header">{title}</CardTitle>
            <CardText className="p-1 fs-400">{shortDescription}</CardText>
          </CardBody>
        </Card>
      </Link>
    );
  });

  return <Container className="d-flex p-0">{blogPostPreviewCards}</Container>;
};

export default BlogPostList;
