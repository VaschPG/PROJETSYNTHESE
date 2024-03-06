import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const DEFAULT_DATE = new Date(Date.now());

/**
 * TODO
 * Convert form date output to Date
 * Fetch post to db
 * Validation
 */

/**
 *
 * @returns
 */
function ProgressForm() {
  function test(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
  }

  return (
    <>
      <Form onSubmit={test} style={{ background: "black", color: "white", border: "solid 3px red", padding: "10px", margin: "auto" }}>
        <Form.Group as={Row} controlId="formWeight">
          <Form.Label column sm="4">
            Weight
          </Form.Label>
          <Col sm="6">
            <Form.Control name="weight" type="number" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formDate">
          <Form.Label column sm="4">
            Date
          </Form.Label>
          <Col sm="6">
            <Form.Control name="date" type="date" defaultValue={DEFAULT_DATE.toISOString().substring(0, 10)} />
          </Col>
        </Form.Group>
        <Button type="submit">Submit form</Button>
      </Form>
    </>
  );
}

export default ProgressForm;
