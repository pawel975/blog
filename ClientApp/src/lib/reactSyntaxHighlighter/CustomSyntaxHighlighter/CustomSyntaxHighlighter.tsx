// Highlighters
import { PrismLight as SyntaxHighlighterPrism, SyntaxHighlighterProps } from "react-syntax-highlighter";
import { Light as SyntaxHighlighterHljs } from "react-syntax-highlighter";

// Prism languages
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
// Hljs languages
import javascript from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import csharp from "react-syntax-highlighter/dist/esm/languages/hljs/csharp";
import typescript from "react-syntax-highlighter/dist/esm/languages/hljs/typescript";
import html from "react-syntax-highlighter/dist/esm/languages/hljs/htmlbars";
import css from "react-syntax-highlighter/dist/esm/languages/hljs/css";
// Styles
import HljsStyle from "react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark";
import PrismStyle from "react-syntax-highlighter/dist/esm/styles/prism/a11y-dark";

// Other
import "./CustomSyntaxHighlighter.css";
import { Alert, Card, CardHeader, CardText } from "reactstrap";
import { CodeBlock } from "../../../common/types";
import { ReactNode } from "react";

const PrismLanguages: CodeBlock["language"][] = ["jsx", "tsx"];
const HljsLanguages: CodeBlock["language"][] = ["cs", "html", "js", "ts", "css"];

// Prism languages registration
SyntaxHighlighterPrism.registerLanguage("jsx", jsx);
SyntaxHighlighterPrism.registerLanguage("tsx", tsx);

// Hljs languages registration
SyntaxHighlighterHljs.registerLanguage("cs", csharp);
SyntaxHighlighterHljs.registerLanguage("html", html);
SyntaxHighlighterHljs.registerLanguage("js", javascript);
SyntaxHighlighterHljs.registerLanguage("ts", typescript);
SyntaxHighlighterHljs.registerLanguage("css", css);

interface CustomSyntaxHighlighterInterface extends SyntaxHighlighterProps {
  language: CodeBlock["language"];
  fileName: string;
}

const customStyles: React.CSSProperties = {
  padding: "2rem",
  border: "none",
  margin: 0,
  borderRadius: 0,
};

const CustomSyntaxHighlighter: React.FC<CustomSyntaxHighlighterInterface> = (props) => {
  const { children, language, fileName } = props;

  const SyntaxWindowWrapper: React.FC<{ children: ReactNode | ReactNode[] }> = ({ children }) => {
    return (
      <Card className="syntax-window-wrapper__header rounded-0 border-0">
        <CardHeader>{fileName}</CardHeader>
        <CardText>{children}</CardText>
      </Card>
    );
  };

  if (PrismLanguages.includes(language)) {
    return (
      <SyntaxWindowWrapper>
        <SyntaxHighlighterPrism customStyle={customStyles} style={PrismStyle} {...props}>
          {children}
        </SyntaxHighlighterPrism>
      </SyntaxWindowWrapper>
    );
  } else if (HljsLanguages.includes(language)) {
    return (
      <SyntaxWindowWrapper>
        <SyntaxHighlighterHljs customStyle={customStyles} style={HljsStyle} {...props}>
          {children}
        </SyntaxHighlighterHljs>
      </SyntaxWindowWrapper>
    );
  } else {
    return <Alert color="danger">Sorry cannot display code block</Alert>;
  }
};

export default CustomSyntaxHighlighter;
