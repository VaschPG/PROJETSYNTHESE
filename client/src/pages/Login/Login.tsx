import Container from "react-bootstrap/Container";
import "./Login.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

function Login() {
  return (
    <>
      <div className="vh-100 d-flex align-items-center justify-content-center background">
        <Container className="ContainerLogin">
          <Form>
            <Row>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control required type="text"></Form.Control>
              </Form.Group>
            </Row>
            <Row className="mt-3">
              <Form.Group>
                <Form.Label className="m10">Password</Form.Label>
                <Form.Control required type="text"></Form.Control>
              </Form.Group>
            </Row>
            <Row className="mt-2">
              <a href="#Register">Register</a>
            </Row>

            <Row className="m-4">
              <Button size="lg" type="submit">
                Continue
              </Button>
            </Row>
          </Form>
        </Container>
      </div>
    </>
  );
}

export default Login;
