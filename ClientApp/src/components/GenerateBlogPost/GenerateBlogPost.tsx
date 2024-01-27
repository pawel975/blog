import { Container } from "reactstrap";
import { BlogPostContentElementType, CodeBlock, ContentElements, ContentImage, Header } from "../../common/types";
import flatContentElements from "../../common/helpers/flatContentElements";
import { Highlight } from "prism-react-renderer";

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
            return <h1>{element.content}</h1>;
          case "h2":
            return <h2>{element.content}</h2>;
          case "h3":
            return <h3>{element.content}</h3>;
          case "h4":
            return <h4>{element.content}</h4>;
          case "h5":
            return <h5>{element.content}</h5>;
          case "h6":
            return <h6>{element.content}</h6>;
          default:
            return null;
        }
      case BlogPostContentElementType.CODE_BLOCK:
        const language: CodeBlock["language"] = (element as CodeBlock).language;
        //TODO: use library to format code

        return (
          <Container className="d-flex flex-column gap-1 border">
            <span>{language}</span>
            <code>{element.content}</code>
          </Container>
        );

      case BlogPostContentElementType.CONTENT_IMAGE:
        const altText: ContentImage["altText"] = (element as ContentImage).altText;
        return (
          <div style={{ width: "50%", margin: "auto", outline: "2px solid red" }}>
            <img style={{ width: "100%" }} src={element.content} alt={altText}></img>
          </div>
        );
      default:
        return "";
    }
  });
  return <Container>{blogPost}</Container>;
};

export default GenerateBlogPost;
