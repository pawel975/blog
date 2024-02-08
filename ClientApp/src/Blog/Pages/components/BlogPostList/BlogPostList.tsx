import { Card, CardBody, CardText, CardTitle, Container } from "reactstrap";
import { Link } from "react-router-dom";
import { BlogPost } from "../../../../data/model/BlogPostModel";
import "./BlogPostList.css";
import shortenLongString from "../../../../common/utils/shortenLongString";

interface BlogPostListInterface {
  blogPosts: BlogPost[];
}

const BlogPostList: React.FC<BlogPostListInterface> = ({ blogPosts }) => {
  const blogPostPreviewCards = blogPosts.map((bp, index) => {
    const { id, title, shortDescription, primaryImageSrc } = bp;
    return (
      <Link className="removed-underline" key={index} to={`/blog/post/${id}`}>
        <Card className="blog-post-list__card emphasized-border">
          <img className="blog-post-list__img" src={primaryImageSrc} alt="post ilustration" />
          <CardBody className="blog-post-list__description">
            <CardTitle className="fs-700 p-0 own-text-accent blog-header">{title}</CardTitle>
            <CardText className=" fs-400">{shortenLongString(shortDescription, 500)}</CardText>
          </CardBody>
        </Card>
      </Link>
    );
  });

  return <Container className="d-flex p-0 flex-column gap-5 ">{blogPostPreviewCards}</Container>;
};

export default BlogPostList;
