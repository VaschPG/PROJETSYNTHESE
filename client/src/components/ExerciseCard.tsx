import Exercise from '../models/Exercise';
import '../pages/ExercisePlan/ExercisePlan.css';
interface IProps {
  exercise: Exercise;
}

const EXERCISE_NAME_LABEL = 'Exercise name: ';
const EXERCISE_EQUIPMENT_LABEL = 'Equipment required: ';
const EXERCISE_BODYPART_LABEL = 'Primary muscle group: ';


function ExerciseCard( { exercise }: IProps) {

  return (
    <>
      <div className='card'>
        <h2>{EXERCISE_NAME_LABEL}{exercise.name}</h2>
        <p>{EXERCISE_EQUIPMENT_LABEL}{exercise.equipment}</p>
        <p>{EXERCISE_BODYPART_LABEL}{exercise.bodypart}</p>
        <img src={exercise.gifurl}></img>
      </div>
    </>
  )
}

export { Exercise };
export default ExerciseCard;
