import { Button } from "reactstrap";

interface ActionButtonsInterface {
  postId: number;
  deleteHandler: (id: number) => void;
  editHandler: (id: number) => void;
}

const ActionButtons: React.FC<ActionButtonsInterface> = ({
  deleteHandler,
  editHandler,
  postId,
}) => {
  return (
    <div className="btn-group">
      <Button onClick={() => deleteHandler(postId)} size="sm" color="danger">
        Delete
      </Button>
      <Button onClick={() => editHandler(postId)} size="sm" color="primary">
        Edit
      </Button>
    </div>
  );
};

export default ActionButtons;
