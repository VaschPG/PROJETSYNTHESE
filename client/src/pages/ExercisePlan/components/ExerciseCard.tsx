import Exercise from "../../../models/Exercise";
import "../ExercisePlan.css";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

/**
 * Interface to ensure type security for our props.
 */
interface IProps {
  exercise: Exercise | null;
  bodyPartArray: string[];
  cardID: number;
  handleSelectChange: (
    e: React.ChangeEvent<HTMLSelectElement>,
    i: number
  ) => void;
}

const EXERCISE_NAME_LABEL = "Exercise name: ";
const EXERCISE_EQUIPMENT_LABEL = "Equipment required: ";
const EXERCISE_BODYPART_LABEL = "Primary muscle group: ";

function ExerciseCard({
  exercise,
  bodyPartArray,
  cardID,
  handleSelectChange,
}: IProps) {
  return (
    <>
      <Card>
        <Container className="row d-flex justify-content-center">
          <Form.Select
            className="card-bodypart-select"
            size="sm"
            onChange={(e) => handleSelectChange(e, cardID)}
          >
            {bodyPartArray != undefined &&
              bodyPartArray.map((item, i) => (
                <option value={Object.values(item)} key={i}>
                  {toUpperFirstLetter(Object.values(item))}
                </option>
              ))}
          </Form.Select>
        </Container>
        {exercise != null && (
          <Container>
            <Card.Body>
              <Card.Title className="text-light">
                <h2 className="exercise-name">{EXERCISE_NAME_LABEL}</h2>
                <h2 className="exercise-name">
                  {toUpperFirstLetter(exercise.name)}
                </h2>
              </Card.Title>
              <Card.Text className="text-light">
                <p>
                  {EXERCISE_EQUIPMENT_LABEL}
                  {toUpperFirstLetter(exercise.equipment)}
                </p>
                <p>
                  {EXERCISE_BODYPART_LABEL}
                  {toUpperFirstLetter(exercise.bodyPart)}
                </p>
              </Card.Text>
            </Card.Body>
            <Card.Img src={exercise.gifUrl} className="image"></Card.Img>
          </Container>
        )}
      </Card>
    </>
  );
}

function toUpperFirstLetter(input: string | string[]): string | string[] {
  if (typeof input === "string") {
    return input.charAt(0).toUpperCase() + input.slice(1);
  } else {
    let array = new Array();
    for (let i = 0; i < input.length; i++) {
      array[i] = input[i].charAt(0).toUpperCase() + input[i].slice(1);
    }
    return array;
  }
}

export default ExerciseCard;
