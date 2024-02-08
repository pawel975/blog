import { Container } from "reactstrap";
import { BlogPostContentElementType, CodeBlock, ContentImage, Header } from "../../common/types";
import flatContentElements from "../../common/utils/flatContentElements";
import CustomSyntaxHighlighter from "../../lib/reactSyntaxHighlighter/CustomSyntaxHighlighter/CustomSyntaxHighlighter";
import { BlogPost } from "../../data/model/BlogPostModel";
import formatTimeToShort from "../../common/utils/formatTimeToShort";

interface GenerateBlogPostInterface {
  BlogPost: BlogPost;
}

const GenerateBlogPost: React.FC<GenerateBlogPostInterface> = ({ BlogPost }) => {
  const blogPost = flatContentElements(BlogPost).map((element, index) => {
    switch (element.type) {
      case BlogPostContentElementType.PARAGRAPH:
        return <p key={index}>{element.content}</p>;
      case BlogPostContentElementType.HEADER:
        const headerLevel: Header["level"] = (element as Header).level;

        switch (headerLevel) {
          case "h1":
            return (
              <h1 key={index} className="blog-header">
                {element.content}
              </h1>
            );
          case "h2":
            return (
              <h2 key={index} className="blog-header">
                {element.content}
              </h2>
            );
          case "h3":
            return (
              <h3 key={index} className="blog-header">
                {element.content}
              </h3>
            );
          case "h4":
            return (
              <h4 key={index} className="blog-header">
                {element.content}
              </h4>
            );
          case "h5":
            return (
              <h5 key={index} className="blog-header">
                {element.content}
              </h5>
            );
          case "h6":
            return (
              <h6 key={index} className="blog-header">
                {element.content}
              </h6>
            );
          default:
            return null;
        }
      case BlogPostContentElementType.CODE_BLOCK:
        const language: CodeBlock["language"] = (element as CodeBlock).language;
        return (
          <CustomSyntaxHighlighter key={index} filetitle="Example.js" language={language}>
            {element.content}
          </CustomSyntaxHighlighter>
        );

      case BlogPostContentElementType.CONTENT_IMAGE:
        const altText: ContentImage["altText"] = (element as ContentImage).altText;
        return (
          <div key={index}>
            <img style={{ width: "100%" }} src={element.content} alt={altText}></img>
          </div>
        );
      default:
        return "";
    }
  });

  return (
    <Container className="d-flex flex-column gap-3 p-0">
      <div className="d-flex flex-column gap-3">
        <div className="d-flex flex-column">
          <h1 className="blog-header fs-900 own-text-accent">{BlogPost.title}</h1>
          <span>
            <strong>Paweł Kurek</strong>
          </span>
          <span className="fs-400">{formatTimeToShort(BlogPost.createdAt)}</span>
        </div>
        <p className="own-border-left-accent">{BlogPost.shortDescription}</p>
      </div>
      {blogPost}
    </Container>
  );
};

export default GenerateBlogPost;
