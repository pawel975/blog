export interface ErrorsObject {
  Title: string[];
  ShortDescription: string[];
  PrimaryImageSrc: string[];
  ContentElements: {
    // TODO: Change any
    Paragraphs: any;
    Headers: any;
    CodeBlocks: any;
    ContentImages: any;
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
