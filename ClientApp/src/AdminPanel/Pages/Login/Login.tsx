import { useState } from "react";
import { Button, Card, CardBody, CardHeader, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { login } from "../../../data/services/AccountService";
import { LoginData } from "../../../data/model/LoginModel";
import axios from "axios";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const loginData: LoginData = {
      Email: email,
      Password: password,
    };

    await login(loginData)
      .then((res) => console.log("You logged in successfully"))
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
            <Button
              onClick={async () => {
                await axios
                  .post("api/account/logout")
                  .then((res) => console.log(res, "logout"))
                  .catch((err) => console.error(err));
              }}
            >
              DELETE THIS BTN - Logout
            </Button>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Login;
