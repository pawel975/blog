import { Alert, Container } from "reactstrap";

interface CreatePostErrorsInterface {
  errors: string[];
}

const CreatePostErrors: React.FC<CreatePostErrorsInterface> = ({ errors }) => {
  return (
    <Container className="d-flex flex-column gap-0 p-0">
      {errors.map((err) => (
        <Alert className="mb-2" color="danger">
          {err}
        </Alert>
      ))}
    </Container>
  );
};

export default CreatePostErrors;
