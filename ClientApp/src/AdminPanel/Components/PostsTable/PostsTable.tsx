import { Table } from "reactstrap";
import ActionButtons from "../ActionButtons/ActionButtons";
import { useNavigate } from "react-router-dom";

interface PostsTableInterface {
  posts: object[];
}

const PostsTable: React.FC<PostsTableInterface> = ({ posts }) => {
  const navigate = useNavigate();
  const TableHeadings = Object.keys(posts[0]);

  function handleDeletePostWithID(id: number): void {
    fetch(`api/blogPosts/${id}`, { method: "DELETE" });
  }

  function handleEditPostWithID(id: number): void {
    navigate(`/admin-panel/posts/${id}/edit`);
  }

  // TODO: Refactor this to be more readable
  return (
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
  );
};

export default PostsTable;
