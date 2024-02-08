import { IndexedGeneralContentElement, ContentElements } from "../types";
import unCapitalizeWord from "./unCapitalizeWord";

const groupContentElements = (elements: IndexedGeneralContentElement[]): ContentElements => {
  const groupedContentElements: ContentElements = {
    paragraphs: [],
    headers: [],
    codeBlocks: [],
    contentImages: [],
  };
  elements.forEach((element) => {
    const elementType = unCapitalizeWord(element.type) + "s";

    if (!groupedContentElements.hasOwnProperty(elementType)) {
      console.error(`Cannot find property of - ${elementType}, in ContentElements`);
    }

    groupedContentElements[elementType].push(element);
  });
  return groupedContentElements;
};

export default groupContentElements;
