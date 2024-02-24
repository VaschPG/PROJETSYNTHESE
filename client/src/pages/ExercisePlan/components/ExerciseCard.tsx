import Exercise from '../../../models/Exercise';
import '../ExercisePlan.css';
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
        <div className='info'>
          <div className='exercise-name-div'>
            <h2 className='exercise-name'>{EXERCISE_NAME_LABEL}</h2>
            <h2 className='exercise-name'>{exercise.name}</h2>
          </div>
          <div>
            <p>{EXERCISE_EQUIPMENT_LABEL}{exercise.equipment}</p>
            <p>{EXERCISE_BODYPART_LABEL}{exercise.bodyPart}</p>
          </div>
        </div>
        <img src={exercise.gifUrl} className='image'></img>
      </div>
    </>
  )
}

export { Exercise };
export default ExerciseCard;
