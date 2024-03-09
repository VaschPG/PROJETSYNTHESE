import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const DEFAULT_DATE = new Date(Date.now());
//Eventually maybe move fetch stuff in it's own file and just import the functions inside it where we need them?
const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
const API_PROGRESSION_URL = import.meta.env.VITE_API_PROGRESSION_URL;
const FULL_API_URL = BASE_API_URL + API_PROGRESSION_URL;

/**
 * TODO
 * Validation
 */

interface IProps {
  auth_id: string | undefined;
  updateDataHandler: () => void;
}

interface IProgData {
  userID: string;
  progression:
    | {
        weight: number | string;
        date: string;
      }
    | { [k: string]: any };
}

/**
 *
 * @returns
 */
function ProgressForm({ auth_id, updateDataHandler }: IProps) {
  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formJson = Object.fromEntries(new FormData(form).entries());
    if (auth_id != null) {
      const data = { userID: auth_id, progression: formJson };
      postFormData(data);
    }
  }

  async function postFormData(formData: IProgData) {
    try {
      const FETCH_URL = FULL_API_URL + "InsertOne";
      const FETCH_TIMER_NAME = "progress-data-post-timer";
      console.log("fetching from " + FETCH_URL);
      console.time(FETCH_TIMER_NAME);
      const response = await fetch(FETCH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Successfully fetched in: ");
        console.timeEnd(FETCH_TIMER_NAME);
        updateDataHandler();
      } else {
        console.log("Response not ok" + data.message);
        console.timeEnd(FETCH_TIMER_NAME);
      }
    } catch (error) {
      console.log("Error on post form data:" + error);
    }
  }

  return (
    <>
      <Form onSubmit={submitForm} style={{ background: "black", color: "white", border: "solid 3px red", padding: "10px", margin: "auto" }}>
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
        <Button type="submit">Ajouter un mesurement de poids</Button>
      </Form>
    </>
  );
}

export default ProgressForm;
