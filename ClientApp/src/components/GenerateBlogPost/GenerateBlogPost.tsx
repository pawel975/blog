import { Container } from "reactstrap";
import { BlogPostContentElementType, CodeBlock, ContentElements, ContentImage, Header } from "../../common/types";
import flatContentElements from "../../common/helpers/flatContentElements";
import CustomSyntaxHighlighter from "./CustomSyntaxHighlighter";

interface GenerateBlogPostInterface {
  contentElements: ContentElements;
}

const GenerateBlogPost: React.FC<GenerateBlogPostInterface> = ({ contentElements }) => {
  const blogPost = flatContentElements(contentElements).map((element) => {
    switch (element.type) {
      case BlogPostContentElementType.PARAGRAPH:
        return <p>{element.content}</p>;
      case BlogPostContentElementType.HEADER:
        const headerLevel: Header["level"] = (element as Header).level;

        switch (headerLevel) {
          case "h1":
            return <h1 className="blog-header">{element.content}</h1>;
          case "h2":
            return <h2 className="blog-header">{element.content}</h2>;
          case "h3":
            return <h3 className="blog-header">{element.content}</h3>;
          case "h4":
            return <h4 className="blog-header">{element.content}</h4>;
          case "h5":
            return <h5 className="blog-header">{element.content}</h5>;
          case "h6":
            return <h6 className="blog-header">{element.content}</h6>;
          default:
            return null;
        }
      case BlogPostContentElementType.CODE_BLOCK:
        const language: CodeBlock["language"] = (element as CodeBlock).language;
        //TODO: Change names in database to correspond names in library for highlighting
        return (
          <CustomSyntaxHighlighter fileName="Example.js" language={language}>
            {element.content}
          </CustomSyntaxHighlighter>
        );

      case BlogPostContentElementType.CONTENT_IMAGE:
        const altText: ContentImage["altText"] = (element as ContentImage).altText;
        return (
          <div style={{ width: "100%" }}>
            <img style={{ width: "100%" }} src={element.content} alt={altText}></img>
          </div>
        );
      default:
        return "";
    }
  });
  return <Container className="d-flex flex-column gap-3">{blogPost}</Container>;
};

export default GenerateBlogPost;
