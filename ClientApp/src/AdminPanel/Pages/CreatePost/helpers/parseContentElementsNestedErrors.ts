import { BlogPostContentElementType } from "../../../../common/types";

interface NestedError {
  index: number;
  propName: string;
  message: string;
}

type ParsedContentElementNestedErrors = {
  Paragraph?: NestedError[];
  Header?: NestedError[];
  CodeBlock?: NestedError[];
  ContentImage?: NestedError[];
};

/**
 *
 * @param errorsObj `response.data.errors` object obtained from API bad request response
 * @returns Parsed form of error of object to use in validation on client side
 */
const parseContentElementsNestedErrors = (errorsObj: any): ParsedContentElementNestedErrors => {
  const errCategories = Object.keys(errorsObj);

  const parsedErrorsCategories: any = {
    ParagraphsEls: [],
    HeadersEls: [],
    CodeBlocksEls: [],
    ContentImagesEls: [],
  };

  errCategories.forEach((cat) => {
    const type = cat.match(/^[a-z]+/gi) && cat.match(/^[a-z]+/gi)![0];
    const index = cat.match(/\[[0-9]+\]/gi) && cat.match(/^[a-z]+/gi)![0];
    const propName = cat.match(/[a-z]+$/gi) && cat.match(/[a-z]+$/gi);

    if (type && index && propName) {
      console.log("Should be nested err like Headers[0].Level");
      const nestedSingleError = { index: index, propName: propName, message: errorsObj[cat] };
      if (type === BlogPostContentElementType.PARAGRAPH) parsedErrorsCategories.Paragraphs.push(nestedSingleError);
      else if (type === BlogPostContentElementType.HEADER) parsedErrorsCategories.Headers.push(nestedSingleError);
      else if (type === BlogPostContentElementType.CODE_BLOCK)
        parsedErrorsCategories.CodeBlocks.push(nestedSingleError);
      else if (type === BlogPostContentElementType.CONTENT_IMAGE)
        parsedErrorsCategories.ContentImages.push(nestedSingleError);
    } else {
      parsedErrorsCategories[cat] = errorsObj[cat];
    }
  });

  console.log(parsedErrorsCategories);

  return parsedErrorsCategories;
};

export default parseContentElementsNestedErrors;
