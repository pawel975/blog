import { Alert } from "reactstrap";

interface ErrorMessageInterface {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageInterface> = ({ message }) => {
  return (
    <Alert color="danger">
      <div>
        <p>An error occurred while loading data:</p>
        <p>
          <strong>{message}</strong>
        </p>
        <p>Possible solutions:</p>
        <ul>
          <li>Check your internet connection.</li>
          <li>Verify the correctness of the API endpoint.</li>
          <li>Try again later.</li>
        </ul>
      </div>
    </Alert>
  );
};
export default ErrorMessage;
