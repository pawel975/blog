import { useParams } from "react-router-dom";
import GenerateBlogPost from "../../../components/GenerateBlogPost/GenerateBlogPost";
import useApiData from "../../../hooks/useApiData";
import { useEffect, useState } from "react";
import { Container, Spinner } from "reactstrap";
import Layout from "../../Layout/Layout";
import { getBlogPost } from "../../../data/services/BlogPostService";
import { BlogPost } from "../../../data/model/BlogPostModel";

const Post: React.FC = () => {
  const { postId } = useParams();
  console.log("Post component rendered");

  const { data, loading, error } = useApiData<BlogPost>(() => getBlogPost(postId!));

  const [post, setPost] = useState<BlogPost | null>();

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
