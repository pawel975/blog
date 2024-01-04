import { Form } from "reactstrap";
import { Button, FormGroup, Input, Label } from "reactstrap";

type FormLayoutProps = {
  children: React.ReactNode;
};

const FormLayout: React.FC<FormLayoutProps> = ({ children }) => {
  return (
    <Form>
      <FormGroup>
        <Label for="content">Content</Label>
        <Input
          className="mb-2"
          // TODO: Implement validation
          // invalid={Boolean(errors["Title"].length > 0)}
          id="content"
          type="text"
          name="content"
          // value={title}
          // onChange={(e) => setTitle(e.target.value)}
        />
        {children}
        {/* TODO: Implement validation */}
        {/* {errors["Title"].map((errorMsg, index) => (
            <FormFeedback key={index}>{errorMsg}</FormFeedback>
          ))} */}
      </FormGroup>
      <Button color="info">Add element</Button>
    </Form>
  );
};

export default FormLayout;
