import { ContentElement, GeneralContentElement } from "../types";

const sortElementsByOrderInBlogPost = (elements: GeneralContentElement[]): ContentElement[] => {
  return [...elements].sort((a, b) => String(a.orderInBlogPost!).localeCompare(String(b.orderInBlogPost)));
};

export default sortElementsByOrderInBlogPost;
