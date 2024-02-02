import { useParams } from "react-router-dom";
import GenerateBlogPost from "../../../components/GenerateBlogPost/GenerateBlogPost";
import useApiData from "../../../hooks/useApiData";
import { useEffect, useState } from "react";
import { BlogPostContent } from "../../../common/types";
import { Container, Spinner } from "reactstrap";
import Layout from "../../Layout/Layout";

const Post: React.FC = () => {
  const { postId } = useParams();

  const { data, loading, error } = useApiData(`api/blogPosts/${postId}`);

  const [post, setPost] = useState<BlogPostContent>();

  useEffect(() => {
    if (!loading && !error) {
      setPost(data);
    }
  }, [data, error, loading]);

  return (
    <Layout>
      <Container>
        {loading ? (
          <Spinner />
        ) : (
          post && (
            <Container className="d-flex flex-column gap-1 p-0">
              <GenerateBlogPost contentElements={post}></GenerateBlogPost>
            </Container>
          )
        )}
      </Container>
    </Layout>
  );
};

export default Post;
