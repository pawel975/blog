export interface NestedError {
  index: number;
  propName: string;
  messages: string[];
}

export interface ErrorsObject {
  Title: string[];
  ShortDescription: string[];
  PrimaryImageSrc: string[];
  ContentElements: {
    // TODO: Change any
    Paragraphs: NestedError[];
    Headers: NestedError[];
    CodeBlocks: NestedError[];
    ContentImages: NestedError[];
  };
  Paragraphs: string[];
  Headers: string[];
  CodeBlocks: string[];
  ContentImages: string[];
}

export interface ContentElements {
  paragraphs: [];
  headers: [];
  codeBlocks: [];
  contentImages: [];
}
