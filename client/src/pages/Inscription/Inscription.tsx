import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import "./Inscription.css";

function Inscription() {
  return (
    <>
      <div className="vh-100 d-flex align-items-center justify-content-center backgroundInscription">
        <Container className="ContainerInscription">
          <Form>
            <Row>
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control required type="text"></Form.Control>
              </Form.Group>
            </Row>
            <Row className="mt-1">
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control required type="text"></Form.Control>
              </Form.Group>
            </Row>
            <Row className="mt-1">
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control required type="text"></Form.Control>
              </Form.Group>
            </Row>
            <Row className="mt-1">
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control required type="Password"></Form.Control>
              </Form.Group>
            </Row>
            <Row className="mt-1">
              <Form.Group as={Col} md="2">
                <Form.Label>Age</Form.Label>
                <Form.Control required type="text"></Form.Control>
              </Form.Group>
              <Form.Group as={Col} md="2">
                <Form.Label>Sexe</Form.Label>
                <Form.Control required type="text"></Form.Control>
              </Form.Group>
            </Row>
            <Row className="mt-1">
              <Form.Group as={Col} md="2">
                <Form.Label>Weight</Form.Label>
                <Form.Control required type="text"></Form.Control>
              </Form.Group>
              <Form.Group as={Col} md="2">
                <Form.Label>Height(cm)</Form.Label>
                <Form.Control required type="text"></Form.Control>
              </Form.Group>
            </Row>

            <Row className="mt-4">
              <Button size="lg" type="submit">
                Register
              </Button>
            </Row>
          </Form>
        </Container>
      </div>
    </>
  );
}

export default Inscription;
