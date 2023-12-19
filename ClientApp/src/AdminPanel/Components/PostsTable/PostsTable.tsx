import { Table } from "reactstrap";
import ActionButtons from "../ActionButtons/ActionButtons";

interface PostsTableInterface {
  posts: object[];
}

const PostsTable: React.FC<PostsTableInterface> = ({ posts }) => {
  const TableHeadings = Object.keys(posts[0]);

  function handleDeletePostWithID(id: number): void {
    fetch(`api/blogPosts/${id}`, { method: "DELETE" });
  }

  function handleModifyPostWithID(id: number): void {
    // TODO: Open Modify handler / Redirect to Modify page

    // TODO: Get Data from form
    const data = {
      name: undefined,
    };

    // TODO: Pass data into fetch
    fetch(`api/blogPosts/${id}`, { method: "PUT", body: data });
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
        {posts.map((post: any) => {
          console.log(post);
          return (
            <tr key={post.id}>
              {Object.keys(post).map((heading) => (
                <td>{post[heading]}</td>
              ))}
              <td>
                <ActionButtons
                  postId={post.id}
                  deleteHandler={handleDeletePostWithID}
                  modifyHandler={handleModifyPostWithID}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default PostsTable;
