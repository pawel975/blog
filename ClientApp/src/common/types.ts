/****** Create / Edit post ******/

// TODO: Move to separate file with content creating logic
// enums and interfaces for created Content Elements
export enum BlogPostContentElementType {
  PARAGRAPH = "Paragraph",
  HEADER = "Header",
  CODE_BLOCK = "CodeBlock",
  CONTENT_IMAGE = "ContentImage",
}

export interface ContentElement {
  content: string;
  orderInBlogPost: number | null;
  type: string;
  id: string;
}

export interface Paragraph extends ContentElement {}

// TODO: move headings validation on server side
export interface Header extends ContentElement {
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

// TODO: move headings validation on server side and extend possible languages support
export interface CodeBlock extends ContentElement {
  language: "js" | "ts" | "cs" | "tsx" | "jsx" | "html" | "css";
}

export interface ContentImage extends ContentElement {
  altText: string;
}

export type GeneralContentElement = Paragraph | Header | CodeBlock | ContentImage;

export type IndexedGeneralContentElement = GeneralContentElement & { [property: string]: any };

export interface ContentElements {
  paragraphs: Paragraph[];
  headers: Header[];
  codeBlocks: CodeBlock[];
  contentImages: ContentImage[];
  // TODO: Not sure if i need to delete this
  [key: string]: any;
}

export interface BlogPostContent {
  id: string;
  title: string;
  shortDescription: string;
  primaryImageSrc: string;
  paragraphs: Paragraph[];
  headers: Header[];
  codeBlocks: CodeBlock[];
  contentImages: ContentImage[];
}
