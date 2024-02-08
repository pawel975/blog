import { Alert, Table } from "reactstrap";
import ActionButtons from "../ActionButtons/ActionButtons";
import { useNavigate } from "react-router-dom";
import "./PostsTable.css";
import isCellValueObject from "./utils/isCellValueObject";
import shortenLongString from "../../../../../common/utils/shortenLongString";

interface PostsTableInterface {
  posts: any[];
  setPosts: Function;
}

const PostsTable: React.FC<PostsTableInterface> = ({ posts, setPosts }) => {
  const navigate = useNavigate();

  function handleDeletePostWithID(id: number): void {
    fetch(`api/blogPosts/${id}`, { method: "DELETE" });

    const filteredPosts = posts.filter((post: { id: number }) => post.id !== id);
    setPosts(filteredPosts);
  }

  function handleEditPostWithID(id: number): void {
    navigate(`/admin-panel/posts/${id}/edit`);
  }

  const TableHeadings =
    posts && posts.length > 0 ? Object.keys(posts[0]).filter((heading) => !isCellValueObject(posts[0][heading])) : [];

  const allTableHeadings = (
    <tr>
      {TableHeadings.map((heading, index) => (
        <th key={index}>{heading}</th>
      ))}
      <th>Actions</th>
    </tr>
  );

  const allPosts = posts.map((post: any) => (
    <tr key={post.id}>
      {TableHeadings.map((heading, index) => {
        const cellValue = post[heading];
        return !isCellValueObject(cellValue) && <td key={index}>{shortenLongString(cellValue)}</td>;
      })}
      <td>
        <ActionButtons postId={post.id} deleteHandler={handleDeletePostWithID} editHandler={handleEditPostWithID} />
      </td>
    </tr>
  ));

  return (
    <>
      {posts && posts.length > 0 ? (
        <Table responsive className="posts-table" striped bordered hover>
          <thead>{allTableHeadings}</thead>
          <tbody>{allPosts}</tbody>
        </Table>
      ) : (
        <Alert color="info">No posts to view</Alert>
      )}
    </>
  );
};

export default PostsTable;
