import { Alert, Table } from "reactstrap";
import ActionButtons from "../ActionButtons/ActionButtons";
import { useNavigate } from "react-router-dom";

interface PostsTableInterface {
  posts: any[];
  setPosts: Function;
}

const PostsTable: React.FC<PostsTableInterface> = ({ posts, setPosts }) => {
  const navigate = useNavigate();
  const TableHeadings = posts && posts.length > 0 ? Object.keys(posts[0]) : [];

  function handleDeletePostWithID(id: number): void {
    fetch(`api/blogPosts/${id}`, { method: "DELETE" });

    const filteredPosts = posts.filter(
      (post: { id: number }) => post.id !== id
    );
    setPosts(filteredPosts);
  }

  function handleEditPostWithID(id: number): void {
    navigate(`/admin-panel/posts/${id}/edit`);
  }

  // TODO: Refactor this to be more readable
  return (
    <>
      {posts && posts.length > 0 ? (
        <Table responsive striped bordered>
          <thead>
            <tr>
              {TableHeadings.map((heading) => (
                <th>{heading}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post: any) => (
              <tr key={post.id}>
                {Object.keys(post).map((heading) => (
                  <td>{post[heading]}</td>
                ))}
                <td>
                  <ActionButtons
                    postId={post.id}
                    deleteHandler={handleDeletePostWithID}
                    editHandler={handleEditPostWithID}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Alert color="info">No posts to view</Alert>
      )}
    </>
  );
};

export default PostsTable;
