import { Table } from "reactstrap";
import ActionButtons from "../ActionButtons/ActionButtons";

interface PostsTableInterface {
  posts: object[];
}

const PostsTable: React.FC<PostsTableInterface> = ({ posts }) => {
  const TableHeadings = Object.keys(posts[0]);

  // function handleDeletePostWithID(
  //   id: any
  // ): (id: number) => Promise<Response> {
  //   return fetch(`api/blogPosts/${id}`, { method: "DELETE" });
  // }

  // function handleModifyPostWithID(id: any): (id: number) => Promise<void> {
  //   throw new Error("Function not implemented.");
  // }

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
                deleteHandler={handleDeletePostWithID(post.id)}
                modifyHandler={handleModifyPostWithID(post.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PostsTable;
