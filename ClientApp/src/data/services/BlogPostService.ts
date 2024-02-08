import httpClient from "../httpClient";
import { BlogPost } from "../model/BlogPostModel";

const RESOURCE = "/blogPosts";

const BlogPostService = {
  getBlogPost(id: BlogPost["id"]) {
    return httpClient.get(`${RESOURCE}/${id}`);
  },
  getBlogPosts() {
    return httpClient.get(`${RESOURCE}`);
  },
};

export const getBlogPost = async (id: BlogPost["id"]): Promise<BlogPost> => {
  try {
    const response = await BlogPostService.getBlogPost(id);
    const requiredFields = [
      "id",
      "title",
      "shortDescription",
      "primaryImageSrc",
      "paragraphs",
      "headers",
      "codeBlocks",
      "contentImages",
    ];

    if (!response.data) throw new Error("No data");

    requiredFields.forEach((field) => {
      if (!response.data[field]) throw new Error(`No ${field} field`);
    });

    return response.data;
  } catch (e) {
    throw new Error(`Error while fetching posts ${e}`);
  }
};

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const response = await BlogPostService.getBlogPosts();
    const requiredFields = [
      "id",
      "title",
      "shortDescription",
      "primaryImageSrc",
      "paragraphs",
      "headers",
      "codeBlocks",
      "contentImages",
    ];

    if (!response.data) throw new Error("No data");

    requiredFields.forEach((field) => {
      if (!response.data[0][field]) throw new Error(`No ${field} field`);
    });

    return response.data;
  } catch (e) {
    throw new Error(`Error while fetching posts ${e}`);
  }
};
