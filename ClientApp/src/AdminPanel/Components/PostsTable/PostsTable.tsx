import { Table } from "reactstrap";

interface PostsTableInterface {
  posts: object[];
}

const PostsTable: React.FC<PostsTableInterface> = ({ posts }) => {
  const TableHeadings = Object.keys(posts[0]);

  // TODO: Refactor this to be more readable
  return (
    <Table responsive>
      <thead>
        <tr>
          {TableHeadings.map((heading) => (
            <th>{heading}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {posts.map((post: any) => (
          <tr key={post.id}>
            {Object.keys(post).map((heading) => (
              <td>{post[heading]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PostsTable;
