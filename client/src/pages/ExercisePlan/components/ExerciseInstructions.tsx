import Exercise from "../../../models/Exercise";

//Instructions should be of type Exercise.instructions but idk how tf to do that so...
interface IProps {
  instructions: string[];
}

function ExerciseInstructions({ instructions }: IProps) {
  //Wasnt worrying about formatting just the implementation, the formatting will be done when we switch to react-bootstrap.
  return (
    <>
      <div>
        {instructions != null &&
          instructions.length > 0 &&
          instructions.map((item, index) => (
            <p>
              {index}. {item}
            </p>
          ))}
      </div>
    </>
  );
}

export default ExerciseInstructions;
