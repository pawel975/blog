import { Button } from "reactstrap";

interface ActionButtonsInterface {
  postId: number;
  deleteHandler: (id: number) => void;
  modifyHandler: (id: number) => void;
}

const ActionButtons: React.FC<ActionButtonsInterface> = ({
  deleteHandler,
  modifyHandler,
  postId,
}) => {
  return (
    <div className="btn-group">
      <Button onClick={() => deleteHandler(postId)} size="sm" color="danger">
        Delete
      </Button>
      <Button onClick={() => modifyHandler(postId)} size="sm" color="primary">
        Modify
      </Button>
    </div>
  );
};

export default ActionButtons;
