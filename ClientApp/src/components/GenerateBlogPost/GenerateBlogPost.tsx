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
        //TODO: Change names in database to correspond names in library for highlighting

        const code = `
        import { IndexedGeneralContentElement, ContentElements } from "../types";
        import unCapitalizeWord from "./unCapitalizeWord";
        
        const groupContentElements = (elements: IndexedGeneralContentElement[]): ContentElements => {
          const groupedContentElements: ContentElements = {
            paragraphs: [],
            headers: [],
            codeBlocks: [],
            contentImages: [],
          };
          elements.forEach((element) => {
            const elementType = unCapitalizeWord(element.type) + "s";
        
            groupedContentElements[elementType].push(element);
          });
          return groupedContentElements;
        };
        
        export default groupContentElements;
        
        `;

        const code2 = `<!DOCTYPE html>
        <html>
        <head>
        <title>Page Title</title>
        </head>
        <body>
        
        <h1>This is a Heading</h1>
        <p>This is a paragraph.</p>
        
        </body>
        </html>`;

        return (
          <Container className="d-flex flex-column justify-content border p-0">
            <CustomSyntaxHighlighter code={code} language={language} />
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
