import Exercise from "../../../models/Exercise";
import "../ExercisePlan.css";

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
      <div className="card">
        <div className="card-bodypart-select-div">
          <select
            className="card-bodypart-select"
            onChange={(e) => handleSelectChange(e, cardID)}
          >
            {bodyPartArray != undefined &&
              bodyPartArray.map((item, i) => (
                <option value={Object.values(item)} key={i}>
                  {toUpperFirstLetter(Object.values(item))}
                </option>
              ))}
          </select>
        </div>
        {exercise != null && (
          <div>
            <div className="card-text-div">
              <div className="exercise-name-div">
                <h2 className="exercise-name">{EXERCISE_NAME_LABEL}</h2>
                <h2 className="exercise-name">
                  {toUpperFirstLetter(exercise.name)}
                </h2>
              </div>
              <div className="exercise-info-div">
                <p>
                  {EXERCISE_EQUIPMENT_LABEL}
                  {toUpperFirstLetter(exercise.equipment)}
                </p>
                <p>
                  {EXERCISE_BODYPART_LABEL}
                  {toUpperFirstLetter(exercise.bodyPart)}
                </p>
              </div>
            </div>
            <img src={exercise.gifUrl} className="image"></img>
          </div>
        )}
      </div>
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
