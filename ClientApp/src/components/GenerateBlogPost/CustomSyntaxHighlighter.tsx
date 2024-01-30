// Highlighters
import { PrismLight as SyntaxHighlighterPrism } from "react-syntax-highlighter";
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
import HljsStyle from "react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark";
import PrismStyle from "react-syntax-highlighter/dist/esm/styles/prism/darcula";

// Other
import { Alert } from "reactstrap";

const PrismLanguages = ["jsx", "tsx"];
const HljsLanguages = ["cs", "html", "js", "ts", "css"];

// Prism languages registration
SyntaxHighlighterPrism.registerLanguage("jsx", jsx);
SyntaxHighlighterPrism.registerLanguage("tsx", tsx);

// Hljs languages registration
SyntaxHighlighterHljs.registerLanguage("cs", csharp);
SyntaxHighlighterHljs.registerLanguage("html", html);
SyntaxHighlighterHljs.registerLanguage("js", javascript);
SyntaxHighlighterHljs.registerLanguage("ts", typescript);
SyntaxHighlighterHljs.registerLanguage("css", css);

interface CustomSyntaxHighlighterInterface {
  code: string | string[];
  language: string;
}

const CustomSyntaxHighlighter: React.FC<CustomSyntaxHighlighterInterface> = (props) => {
  const { code, language } = props;

  if (PrismLanguages.includes(language)) {
    return (
      <SyntaxHighlighterPrism style={PrismStyle} {...props}>
        {code}
      </SyntaxHighlighterPrism>
    );
  } else if (HljsLanguages.includes(language)) {
    return (
      <SyntaxHighlighterHljs style={HljsStyle} {...props}>
        {code}
      </SyntaxHighlighterHljs>
    );
  } else {
    return <Alert color="danger">Sorry cannot display code block</Alert>;
  }
};

export default CustomSyntaxHighlighter;
