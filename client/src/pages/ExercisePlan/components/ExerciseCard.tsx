import Exercise from '../../../models/Exercise';
import '../ExercisePlan.css';

/**
 * Interface to ensure type security for our props.
 */
interface IProps {
	exercise: Exercise | null;
	bodyPartArray: string[];
}

const EXERCISE_NAME_LABEL = 'Exercise name: ';
const EXERCISE_EQUIPMENT_LABEL = 'Equipment required: ';
const EXERCISE_BODYPART_LABEL = 'Primary muscle group: ';

//-If(!bodyPartsArray)
//-Show loading on dropdown menu
//else map => dropdown elements
//if(exercise != null)
//render exercise info.

function ExerciseCard({ exercise, bodyPartArray }: IProps) {
	return (
		<>
			<div className='card'>
				<div className='card-bodypart-picker-div'>
					<select className='card-bodypart-picker'>
						{bodyPartArray != undefined &&
							bodyPartArray.map((item, i) => (
								<option value={Object.values(item)} key={i}>
									{Object.values(item)}
								</option>
							))}
					</select>
				</div>

				{exercise != null && (
					<div>
						<div className='card-text-div'>
							<div className='exercise-name-div'>
								<h2 className='exercise-name'>{EXERCISE_NAME_LABEL}</h2>
								<h2 className='exercise-name'>{toUpperFirstLetter(exercise.name)}</h2>
							</div>
							<div className='exercise-info-div'>
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
						<img src={exercise.gifUrl} className='image'></img>
					</div>
				)}
			</div>
		</>
	);
}

function toUpperFirstLetter(input: string): string {
	return input.charAt(0).toUpperCase() + input.slice(1);
}

export default ExerciseCard;
