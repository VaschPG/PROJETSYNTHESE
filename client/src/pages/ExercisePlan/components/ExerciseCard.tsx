import { useState } from "react";
import Exercise from "../../../models/Exercise";
import ExerciseInstructions from "./ExerciseInstructions";

/**
 * Interface to ensure at compiler type security for our props.
 * It's javascript so you never get type security at run time C:.
 */
interface IProps {
  exercise: Exercise | null;
  bodyPartArray: string[];
  cardID: number;
  handleSelectChangeCallback: (e: React.ChangeEvent<HTMLSelectElement>, cardID: number) => void;
  handleRemoveExerciseOnClickCallback: (cardID: number) => void;
  selectBodyPart: string;
  handleOnClickPinCallback: (cardID: number) => void;
  isPinned: boolean;
  onImageErrorCallback: (e: React.SyntheticEvent<HTMLImageElement>, cardID: number) => void;
}

const EXERCISE_NAME_LABEL = "Exercise name: ";
const EXERCISE_EQUIPMENT_LABEL = "Equipment required: ";
const EXERCISE_BODYPART_LABEL = "Primary muscle group: ";

//Eventually switch this from divs with fixed spacing to flex col? Idk we'll see when we switch to bootstrap
//TODO- Add instructions/gif button that switches between gif and instructions when pressed.
//Put all the handles in an object dumbass. That way we dont have 18 billion props.
//Export/import your interfaces instead of rewritting them everywhere you donkey.
function ExerciseCard({
  exercise,
  bodyPartArray,
  cardID,
  handleSelectChangeCallback,
  handleRemoveExerciseOnClickCallback,
  selectBodyPart,
  handleOnClickPinCallback,
  isPinned,
  onImageErrorCallback,
}: IProps) {
  const [isInstructionsOpen, setIsInstructionsOpen] = useState<boolean>(false);

  return (
    <>
      <div className="exercise-card">
        <button className={!isPinned ? "btn-pin" : "btn-pinned"} onClick={() => handleOnClickPinCallback(cardID)}>
          {!isPinned ? "Pin" : "Pinned"}
        </button>
        <div className="card-bodypart-select-div">
          <select className="card-bodypart-select" value={selectBodyPart} onChange={(e) => handleSelectChangeCallback(e, cardID)}>
            {bodyPartArray != undefined &&
              bodyPartArray.map((item, index) => (
                <option value={Object.values(item)} key={index}>
                  {toUpperFirstLetter(Object.values(item))}
                </option>
              ))}
          </select>
        </div>
        {exercise != null && (
          <div>
            <div className="card-text-div">
              <div className="exercise-name-div">
                <div className="exercise-name-div-div">
                  <h2 className="exercise-name">{EXERCISE_NAME_LABEL}</h2>
                  <h2 className="exercise-name">{toUpperFirstLetter(exercise.name)}</h2>
                </div>
              </div>
              <div className="exercise-info-div">
                <p className="exercise-info-text">
                  {EXERCISE_EQUIPMENT_LABEL}
                  {toUpperFirstLetter(exercise.equipment)}
                </p>
                <p className="exercise-info-text">
                  {EXERCISE_BODYPART_LABEL}
                  {toUpperFirstLetter(exercise.bodyPart)}
                </p>
              </div>
            </div>
            <img src={exercise.gifUrl} className="image" onError={(e) => onImageErrorCallback(e, cardID)}></img>
            <div>
              <button
                onClick={() => {
                  setIsInstructionsOpen(!isInstructionsOpen);
                }}
                className="inst-button"
              >
                {isInstructionsOpen ? "Close instructions" : "Open instructions"}
              </button>
              {isInstructionsOpen && <ExerciseInstructions instructions={exercise.instructions} />}
            </div>
          </div>
        )}
        <div>
          <button className="ex-button" onClick={() => handleRemoveExerciseOnClickCallback(cardID)}>
            -
          </button>
        </div>
      </div>
    </>
  );
}

function toUpperFirstLetter(input: string | string[]): string | string[] {
  if (input == null) {
    return "";
  }
  if (typeof input === "string") {
    return input.charAt(0).toUpperCase() + input.slice(1);
  } else {
    const array = [];
    for (let i = 0; i < input.length; i++) {
      array[i] = input[i].charAt(0).toUpperCase() + input[i].slice(1);
    }
    return array;
  }
}

export default ExerciseCard;
