import { CodeBlock, ContentImage, Header, Paragraph } from "../../common/types";

export interface BlogPost {
  id: string;
  title: string;
  shortDescription: string;
  primaryImageSrc: string;
  paragraphs: Paragraph[];
  headers: Header[];
  codeBlocks: CodeBlock[];
  contentImages: ContentImage[];
}

export interface BlogPosts {
  blogPosts: BlogPost[];
}
