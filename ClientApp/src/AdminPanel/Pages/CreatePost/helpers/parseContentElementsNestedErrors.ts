import { BlogPostContentElementType } from "../../../../common/types";

interface NestedError {
  index: number;
  propName: string;
  message: string;
}

/**
 *
 * @param errorsObj `response.data.errors` object obtained from API bad request response
 * @returns Parsed form of error of object to use in validation on client side
 */
const parseContentElementsNestedErrors = (errorsObj: any) => {
  const errCategories = Object.keys(errorsObj);

  const parsedErrorsCategories: any = {
    ContentElements: {
      Paragraphs: [],
      Headers: [],
      CodeBlocks: [],
      ContentImages: [],
    },
  };

  errCategories.forEach((cat) => {
    const type = cat.match(/^[a-z]+/gi) && cat.match(/^[a-z]+/gi)![0];
    const index = cat.match(/\[[0-9]+\]/gi) && cat.match(/^[a-z]+/gi)![0];
    const propName = cat.match(/[a-z]+$/gi) && cat.match(/[a-z]+$/gi)![0];

    if (type && index && propName) {
      const nestedSingleError: NestedError = {
        index: index as unknown as number,
        propName: propName,
        message: errorsObj[cat],
      };
      if (type === BlogPostContentElementType.PARAGRAPH)
        parsedErrorsCategories.ContentElements.Paragraphs.push(nestedSingleError);
      else if (type === BlogPostContentElementType.HEADER)
        parsedErrorsCategories.ContentElements.Headers.push(nestedSingleError);
      else if (type === BlogPostContentElementType.CODE_BLOCK)
        parsedErrorsCategories.ContentElements.CodeBlocks.push(nestedSingleError);
      else if (type === BlogPostContentElementType.CONTENT_IMAGE)
        parsedErrorsCategories.ContentElements.ContentImages.push(nestedSingleError);
    } else {
      parsedErrorsCategories[cat] = errorsObj[cat];
    }
  });

  return parsedErrorsCategories;
};

export default parseContentElementsNestedErrors;
