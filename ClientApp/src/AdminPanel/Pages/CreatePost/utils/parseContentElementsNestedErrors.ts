import { BlogPostContentElementType } from "../../../../common/types";
import { NestedError } from "../types";

interface parsedErrorsCategories {
  ContentElements: {
    Paragraphs: NestedError[];
    Headers: NestedError[];
    CodeBlocks: NestedError[];
    ContentImages: NestedError[];
  };
  [key: string]: string[] | any;
}
/**
 *
 * @param errorsObj `response.data.errors` object obtained from API bad request response
 * @returns Parsed form of error of object to use in validation on client side
 */
const parseContentElementsNestedErrors = (errorsObj: any) => {
  if (!errorsObj) {
    console.error("errorsObj cannot be null");
    return;
  }
  const errCategories = Object.keys(errorsObj);

  const parsedErrorsCategories: parsedErrorsCategories = {
    ContentElements: {
      Paragraphs: [],
      Headers: [],
      CodeBlocks: [],
      ContentImages: [],
    },
    // Here will be dynamically placed other error categories
  };

  errCategories.forEach((cat) => {
    const type = cat.match(/^[a-z]+/gi) && cat.match(/^[a-z]+/gi)![0];
    const index = cat.match(/[0-9]+/gi) && cat.match(/[0-9]+/gi)![0];
    const propName = cat.match(/[a-z]+$/gi) && cat.match(/[a-z]+$/gi)![0];

    if (type && index && propName) {
      const nestedSingleError: NestedError = {
        index: index as unknown as number,
        propName: propName,
        messages: errorsObj[cat],
      };
      if (type.toLowerCase() === BlogPostContentElementType.PARAGRAPH.toLowerCase() + "s") {
        parsedErrorsCategories.ContentElements.Paragraphs.push(nestedSingleError);
      } else if (type.toLowerCase() === BlogPostContentElementType.HEADER.toLowerCase() + "s")
        parsedErrorsCategories.ContentElements.Headers.push(nestedSingleError);
      else if (type.toLowerCase() === BlogPostContentElementType.CODE_BLOCK.toLowerCase() + "s")
        parsedErrorsCategories.ContentElements.CodeBlocks.push(nestedSingleError);
      else if (type.toLowerCase() === BlogPostContentElementType.CONTENT_IMAGE.toLowerCase() + "s")
        parsedErrorsCategories.ContentElements.ContentImages.push(nestedSingleError);
      else {
        console.error(
          `nestedSingleError of {index: ${nestedSingleError.index}, propName: ${nestedSingleError.propName}} cannot match any type from BlogPostContentElementType interface`
        );
      }
    } else {
      parsedErrorsCategories[cat] = errorsObj[cat];
    }
  });

  return parsedErrorsCategories;
};

export default parseContentElementsNestedErrors;
