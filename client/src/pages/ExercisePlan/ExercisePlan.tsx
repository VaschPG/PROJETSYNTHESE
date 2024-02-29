import { useState, useEffect } from 'react';
import ExerciseCard from './components/ExerciseCard';
import Exercise from '../../models/Exercise';
import CheckBox from './components/CheckBox';
import './ExercisePlan.css';

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
const API_EXERCISES_URL = import.meta.env.VITE_API_EXERCISES_URL;
const FULL_API_URL = BASE_API_URL + API_EXERCISES_URL;
const NB_EXERCISES = 6;

////TODO Add pin button implementation
////TODO COMMENT BETTER.

/**
 *
 */
interface BodyPartAndEquipmentArray {
	bodyPartArray: string[];
	equipmentArray: string[];
}

/**
 *
 */
interface ExerciseCardData {
	exercise: Exercise | null;
	selectedBodyPart: string;
	isPinned: boolean;
}

function App() {
	const [exerciseCardData, setExerciseCardData] = useState(new Array<ExerciseCardData>(NB_EXERCISES));
	const [initData, setInitData] = useState<BodyPartAndEquipmentArray>({
		bodyPartArray: [''],
		equipmentArray: [''],
	});
	const [checkedEquipmentList, setCheckedEquipmentList] = useState<string[]>(['body weight']);

	/**
	 * Fetch all the data we need that will not change.
	 * Data: bodyPart and equipment array
	 */
	useEffect(() => {
		fetchBodyPartAndEquipmentArray();
		const arr = exerciseCardData;
		if (arr[0] === undefined) {
			arr.fill({ exercise: null, selectedBodyPart: '', isPinned: false });
		}
		setExerciseCardData(arr);
	}, []);

	/**
	 * When initData changes we change the value of exercises.selectedBodyPart to be the first element in the array if they're undefined or an empty string.
	 */
	useEffect(() => {
		const arr = exerciseCardData.map((item) => {
			if (item.selectedBodyPart == '' || item.selectedBodyPart == undefined) {
				return {
					...item,
					selectedBodyPart: Object.values(initData.bodyPartArray[0])[0],
				};
			} else {
				return item;
			}
		});
		setExerciseCardData(arr);
	}, [initData.bodyPartArray]);

	/**
	 * Fetches the list of all distinct values of bodyParts and equipment in our database
	 */
	async function fetchBodyPartAndEquipmentArray() {
		try {
			const FETCH_URL = FULL_API_URL + 'DistinctBodyPartAndEquipmentValues';
			const FETCH_TIMER_NAME = 'exercise-initial-data-fetch-timer';
			console.log('fetching from ' + FETCH_URL);
			console.time(FETCH_TIMER_NAME);
			const response = await fetch(FETCH_URL, {
				method: 'GET',
			});
			const data = await response.json();
			if (response.ok) {
				console.log('Successfully fetched in: ');
				console.timeEnd(FETCH_TIMER_NAME);
				setInitData(data);
			} else {
				console.log('Response not ok' + data.message);
				console.timeEnd(FETCH_TIMER_NAME);
			}
		} catch (error) {
			console.log('Error on fetchBodyPartArray:' + error);
		}
		console.log(initData);
	}

	/**
	 * ---DISREGARD-Requires a if(fetchSpecificExercises.length > 0) check before otherwise it could throw error cos there's no equipment.
	 * ---Or a change to the back end that uses the no equipment one if there's no equipment
	 * -ABOUT ^ DO IT BACK END, BACK END IS WHERE WE ALWAYS NEED TO VERIFY-
	 * NEED TO ADD A MESSAGE ON RECIEVING NULL SINCE THAT MEANS THERE'S NO EQUIPMENT
	 *
	 * MEDIUM ISSUE, INTRODUCING PIN MEANS WE NEED TO SEND OVER THE PINNED IDS SO WE CAN MAKE SURE NOT TO GET DUPLICATES.
	 */
	async function fetchSpecificExercises() {
		try {
			///Fetch url info///
			const FETCH_URL = FULL_API_URL + 'WithBodyPartsAndEquipmentQuery/?';
			const FETCH_TIMER_NAME = 'exercise-fetch-timer';
			console.log('fetching from ' + FETCH_URL);

			let params = new URLSearchParams();
			exerciseCardData.map((item) => {
				if (item.isPinned) {
					params.append('bodyPart', '');
				} else {
					params.append('bodyPart', item.selectedBodyPart);
				}
			});
			checkedEquipmentList.map((item) => {
				params.append('equipment', item);
				console.log(item);
			});

			console.time(FETCH_TIMER_NAME);
			const response = await fetch(FETCH_URL + params);
			const data = await response.json();
			if (response.ok) {
				console.log('Successfully fetched in: ');
				console.timeEnd(FETCH_TIMER_NAME);
				const newExercises = data.map((item: ExerciseCardData['exercise'], i: number) => {
					let _exercise = exerciseCardData[i].isPinned ? exerciseCardData[i].exercise : item;
					return {
						exercise: _exercise,
						selectedBodyPart: exerciseCardData[i].selectedBodyPart,
						isPinned: exerciseCardData[i].isPinned,
					};
				});
				setExerciseCardData(newExercises);
			} else {
				console.log('Response not ok' + data.message);
				console.timeEnd(FETCH_TIMER_NAME);
			}
		} catch (error) {
			console.log('Error on fetchSpecificExercises:' + error);
		}
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
	 * @param e
	 * @param cardID
	 */
	let handleCardSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, cardID: number): void => {
		const newExercises = exerciseCardData.map((item, i) => {
			if (cardID == i) {
				return { ...item, selectedBodyPart: e.target.value };
			} else {
				return item;
			}
		});
		setExerciseCardData(newExercises);
	};

	/**
	 *
	 */
	function handleTestClick() {}

	/**
	 *
	 */
	function handleAddExerciseOnClick() {
		setExerciseCardData([
			...exerciseCardData,
			{
				exercise: null,
				selectedBodyPart: Object.values(initData.bodyPartArray[0])[0],
				isPinned: false,
			},
		]);
	}

	/**
	 *
	 * @param e
	 * @param cardID
	 */
	let handleRemoveExerciseOnClick = (e: React.MouseEvent<HTMLButtonElement>, cardID: number): void => {
		setExerciseCardData(exerciseCardData.filter((item, i) => i !== cardID));
	};

	/**
	 *
	 * @param e
	 * @param value
	 */
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

	let handleOnClickPin = (e: React.MouseEvent<HTMLButtonElement>, cardID: number): void => {
		const newExercises = exerciseCardData.map((item, i) => {
			if (cardID == i) {
				return { ...item, isPinned: !item.isPinned };
			} else {
				return item;
			}
		});
		setExerciseCardData(newExercises);
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
							{exerciseCardData.map((item, i) => (
								<ExerciseCard
									key={i}
									exercise={item.exercise}
									bodyPartArray={initData.bodyPartArray}
									cardID={i}
									handleSelectChange={handleCardSelectChange}
									handleRemoveExerciseOnClick={handleRemoveExerciseOnClick}
									selectBodyPart={item.selectedBodyPart}
									handleOnClickPin={handleOnClickPin}
									isPinned={item.isPinned}
								/>
							))}
						</div>
					</div>
					<div className='div-equipment-list'>
						{
							/*ISSUE HERE WHERE RELOADING GIVES A DIFFERENT LIST WHICH UNTICKS BOXES*/
							initData.equipmentArray.length > 0 && initData.equipmentArray[0] != '' ? (
								initData.equipmentArray.map((item, i) => (
									<CheckBox
										key={Object.values(item)[0]}
										label={Object.values(item)[0]}
										value={Object.values(item)[0]}
										handleOnCheck={handleOnCheckEquipment}
										isDefaultChecked={Object.values(item)[0] == 'body weight' ? true : false}
									/>
								))
							) : (
								<div></div>
							)
						}
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
