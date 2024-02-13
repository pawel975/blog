import { useState } from "react";
import { Button, Card, CardBody, CardHeader, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { login } from "../../../data/services/AccountService";
import { LoginData } from "../../../data/model/LoginModel";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const loginData: LoginData = {
      Email: email,
      Password: password,
    };

    // TODO: save token got from login and save it to session storage or httponly cookie
    await login(loginData)
      // TODO: Instead of printing response perform logic to save token into
      .then((res) => console.log(res))
      //TODO: Show invalid username and password info in form
      .catch((err) => err);
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vw-100 vh-100">
      <Card className="border-0 rounded-0 emphasized-border" style={{ width: "clamp(15rem, 50%, 30rem)" }}>
        <CardHeader className=" text-center border-0 rounded-0 ">
          Log in to <strong>Admin Panel</strong>
        </CardHeader>
        <CardBody>
          <Form onSubmit={(e) => handleSubmit(e)} className="d-flex flex-column">
            <FormGroup>
              <Label for="email">Email</Label>
              <Input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormGroup>
            <Button type="submit" className="m-auto px-4 border">
              Login
            </Button>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Login;