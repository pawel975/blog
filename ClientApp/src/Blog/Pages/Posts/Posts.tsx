import React, { useEffect, useState } from "react";
import BlogLayout from "../../Layout/BlogLayout";
import useApiData from "../../../hooks/useApiData";
import BlogPostList from "../components/BlogPostList";
import { getBlogPosts } from "../../../data/services/BlogPostService";
import { BlogPost } from "../../../data/model/BlogPostModel";
import PageHeader from "../components/PageHeader";
import CustomSpinner from "../../../lib/reactStrap/CustomSpinner";

const Posts: React.FC = () => {
  const { data, loading, error } = useApiData<BlogPost[]>(() => getBlogPosts());
  const [blogPosts, setBlogPosts] = useState<BlogPost[] | null>([]);

  useEffect(() => {
    if (!loading && !error) {
      setBlogPosts(data);
    }
  }, [data, loading, error]);

  return (
    <BlogLayout>
      <PageHeader pageTitle="Posts" />
      {loading ? <CustomSpinner sizeRem={1} /> : blogPosts && <BlogPostList blogPosts={blogPosts} />}
    </BlogLayout>
  );
};

export default Posts;
