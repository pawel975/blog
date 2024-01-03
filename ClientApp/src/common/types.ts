/****** Create / Edit post ******/

// TODO: Move to separate file with content creating logic
// enums and interfaces for created Content Elements
enum BlogPostContentElementType {
  PARAGRAPH = "Paragraph",
  HEADER = "Header",
  CODE_BLOCK = "CodeBlock",
  CONTENT_IMAGE = "ContentImage",
}

interface ContentElement {
  content: string;
}

interface Paragraph extends ContentElement {}

// TODO: move headings validation on server side
interface Header extends ContentElement {
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

// TODO: move headings validation on server side and extend possible languages support
interface CodeBlock extends ContentElement {
  language: "js" | "cs" | "html" | "css";
}

interface ContentImage extends ContentElement {
  altText: string;
}
