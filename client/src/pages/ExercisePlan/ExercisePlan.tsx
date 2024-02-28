import { useState, useEffect } from 'react';
import ExerciseCard from './components/ExerciseCard';
import Exercise from '../../models/Exercise';
import CheckBox from './components/CheckBox';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const NB_EXERCISES = 6;

//TODO --Check if there's a way to ensure no duplicates when we search--Done, Dunno if we want to use it tho but the dbo function is done

/**
 *
 */
interface BodyPartAndEquipmentArray {
	bodyPartArray: string[];
	equipmentArray: string[];
}

interface ExerciseCardData {
	exercise: Exercise | null;
	selectedBodyPart: string;
}

interface CheckedEquipmentList {
	equipmentList: string[];
}

function App() {
	const [exercises, setExercises] = useState(new Array<ExerciseCardData>(NB_EXERCISES));
	const [initData, setInitData] = useState<BodyPartAndEquipmentArray>({ bodyPartArray: [''], equipmentArray: [''] });
	const [checkedEquipmentList, setCheckedEquipmentList] = useState<string[]>([]);

	/**
	 * Fetch all the data we need that will not change.
	 * Data: bodyPart and equipment array
	 */
	useEffect(() => {
		fetchBodyPartAndEquipmentArray();
		const arr = exercises;
		if (arr[0] === undefined) {
			arr.fill({ exercise: null, selectedBodyPart: '' });
		}
		setExercises(arr);
	}, []);

	/**
	 * When initData changes we change the value of exercises.selectedBodyPart to be the first element in the array if they're undefined or an empty string.
	 */
	useEffect(() => {
		const arr = exercises.map((item) => {
			if (item.selectedBodyPart == '' || item.selectedBodyPart == undefined) {
				return { exercise: item.exercise, selectedBodyPart: Object.values(initData.bodyPartArray[0])[0] };
			} else {
				return { exercise: item.exercise, selectedBodyPart: item.selectedBodyPart };
			}
		});
		setExercises(arr);
	}, [initData.bodyPartArray]);

	/**
	 * Fetches the list of all distinct values of bodyParts and equipment in our database
	 */
	async function fetchBodyPartAndEquipmentArray() {
		try {
			console.log('fetching from ' + BASE_URL + '/api/getBodyPartAndEquipmentArray');
			console.time('initial-data-fetch-timer');
			const response = await fetch(BASE_URL + '/api/getBodyPartAndEquipmentArray', {
				method: 'GET',
			});
			const data = await response.json();
			console.log('Successfully fetched in: ');
			console.timeEnd('initial-data-fetch-timer');
			if (response.ok) {
				setInitData(data);
			} else {
				console.log('Response not ok');
			}
		} catch (error) {
			console.log('Error on fetchBodyPartArray:' + error);
		}
		console.log(initData);
	}

	/**
	 * On click event handler for the search button
	 * Calls getNewExercises to fetch exercises from our back end and add them to exercises state object.
	 */
	function handleSearchClick() {
		fetchSpecificExercises();
	}

	/**
	 *
	 */
	async function fetchSpecificExercises() {
		try {
			let params = new URLSearchParams();
			exercises.map((item) => {
				params.append('bodyPart', item.selectedBodyPart);
			});
			console.log('fetching from ' + BASE_URL);
			console.time('fetch-timer');
			const response = await fetch(BASE_URL + '/api/getExercisesByBodyPartQuery/?' + params);
			const data = await response.json();
			console.log('Successfully fetched in: ');
			console.timeEnd('fetch-timer');
			if (response.ok) {
				const newExercises = data.map((item: ExerciseCardData, i: number) => {
					return { exercise: item, selectedBodyPart: exercises[i].selectedBodyPart };
				});
				setExercises(newExercises);
			} else {
				console.log('Response not ok');
			}
		} catch (error) {
			console.log('Error on fetchSpecificExercises:' + error);
		}
	}

	let handleCardSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, cardID: number): void => {
		const newExercises = exercises.map((item, i) => {
			if (cardID == i) {
				return { exercise: item.exercise, selectedBodyPart: e.target.value };
			} else {
				return item;
			}
		});
		setExercises(newExercises);
	};

	function handleTestClick() {}

	function handleAddExerciseOnClick() {
		setExercises([...exercises, { exercise: null, selectedBodyPart: Object.values(initData.bodyPartArray[0])[0] }]);
	}

	let handleRemoveExerciseOnClick = (e: React.MouseEvent<HTMLButtonElement>, cardID: number): void => {
		setExercises(exercises.filter((item, i) => i !== cardID));
	};

	let handleOnCheckEquipment = (e: React.ChangeEvent<HTMLInputElement>, value: string): void => {
		//Make sure value is not null
		if (value != null && value != undefined) {
			//If checked (check if in array(in case of fuckery)) and add it otherwise filter from array
			if (e.target.checked) {
				if (!checkedEquipmentList.includes(value)) {
					setCheckedEquipmentList([...checkedEquipmentList, value]);
				}
			} else {
				setCheckedEquipmentList(checkedEquipmentList.filter((item) => item != value));
			}
		}
	};

	return (
		<>
			<div className='exercise-plan-root'>
				<button className='ex-button' onClick={handleAddExerciseOnClick}>
					+
				</button>
				<button className='ex-button' onClick={handleSearchClick}>
					Search
				</button>
				<section className='section-card-and-equipment-list'>
					<div className='div-div-card'>
						<div className='div-card'>
							{exercises.map((item, i) => (
								<ExerciseCard
									key={i}
									exercise={item.exercise}
									bodyPartArray={initData.bodyPartArray}
									cardID={i}
									handleSelectChange={handleCardSelectChange}
									handleRemoveExerciseOnClick={handleRemoveExerciseOnClick}
									selectBodyPart={item.selectedBodyPart}
								/>
							))}
						</div>
					</div>
					<div className='div-equipment-list'>
						{initData.equipmentArray.map((item, i) => (
							<CheckBox label={Object.values(item)[0]} value={Object.values(item)[0]} handleOnCheck={handleOnCheckEquipment} />
						))}
					</div>
				</section>
				<div style={{ display: 'none' }}>
					<button className='ex-button' onClick={handleTestClick}>
						Test
					</button>
				</div>
			</div>
		</>
	);
}

export default App;
