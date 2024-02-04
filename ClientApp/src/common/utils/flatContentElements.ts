import { ContentElements, GeneralContentElement } from "../types";
import sortElementsByOrderInBlogPost from "./sortElementsByOrderInBlogPost";

const flatContentElements = (contentElements: ContentElements): GeneralContentElement[] => {
  const contentElementsTypes = Object.keys(contentElements);
  const flattenContentElementsArray: GeneralContentElement[] = [];

  contentElementsTypes.forEach((type) => {
    flattenContentElementsArray.push(...contentElements[type]);
  });

  return sortElementsByOrderInBlogPost(flattenContentElementsArray);
};

export default flatContentElements;
