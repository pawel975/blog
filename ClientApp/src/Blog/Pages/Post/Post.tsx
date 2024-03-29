import { useParams } from "react-router-dom";
import GenerateBlogPost from "../../../components/GenerateBlogPost/GenerateBlogPost";
import useApiData from "../../../hooks/useApiData";
import { useEffect, useState } from "react";
import { Container, Spinner } from "reactstrap";
import BlogLayout from "../../Layout/BlogLayout";
import { getBlogPost } from "../../../data/services/BlogPostService";
import { BlogPost } from "../../../data/model/BlogPostModel";

const Post: React.FC = () => {
  const { postId } = useParams();

  const { data, loading, error } = useApiData<BlogPost>(() => getBlogPost(postId!));
  const [post, setPost] = useState<BlogPost | null>();

  useEffect(() => {
    if (!loading && !error) {
      setPost(data);
    }
  }, [data, error, loading]);

  return (
    <BlogLayout>
      <Container>{loading ? <Spinner /> : post && <GenerateBlogPost BlogPost={post}></GenerateBlogPost>}</Container>
    </BlogLayout>
  );
};

export default Post;
