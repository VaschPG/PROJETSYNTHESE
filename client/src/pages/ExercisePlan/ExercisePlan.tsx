import { useState, useEffect } from 'react';
import ExerciseCard from './components/ExerciseCard';
import Exercise from '../../models/Exercise';
import CheckBox from './components/CheckBox';
import './ExercisePlan.css';

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
const API_EXERCISES_URL = import.meta.env.VITE_API_EXERCISES_URL;
const FULL_API_URL = BASE_API_URL + API_EXERCISES_URL;
const NB_EXERCISES = 6;
const LOCAL_STORAGE_CARD_DATA_NAME = 'exerciseCardData';

/**
 * TODO LIST:
 * --MOSTLY DONE-- Update gifurl when it's busted. Think about fixing gifurl in onError vs on loading data card.
 * Implement saving data to db! (Maybe wait on user/login to be done?)
 * Implement more info to see all the info of an exercise(By expanding the card, probably only expand one at a time, like when one expands the one that was expanded before goes back to normal size).
 * Implement switching between gif and instructions? Or maybe just add instructions below the gif? ASK EMA
 * Internationalisation
 * Tests
 * DOCUMENT EVERYTHING!
 * Make a const of the default exerciseDataCard and use it/parts of it instead of having that { exercise: null, selectedBodyPart: '', isPinned: false } shit everywhere.
 */

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

/**
 *
 * @returns
 */
function ExercisePlan() {
	const [exerciseCardData, setExerciseCardData] = useState<ExerciseCardData[]>(getLocalCardData());
	const [initData, setInitData] = useState<BodyPartAndEquipmentArray>({
		bodyPartArray: [''],
		equipmentArray: [''],
	});
	const [checkedEquipmentList, setCheckedEquipmentList] = useState<string[]>(['body weight']);

	function getLocalCardData(): ExerciseCardData[] {
		const localCardData = localStorage.getItem(LOCAL_STORAGE_CARD_DATA_NAME);
		let localCardDataParsed;
		if (localCardData != null) {
			localCardDataParsed = JSON.parse(localCardData);
		}
		let arr: ExerciseCardData[] = new Array<ExerciseCardData>(NB_EXERCISES);
		if (localCardDataParsed == null) {
			arr.fill({ exercise: null, selectedBodyPart: '', isPinned: false });
		} else if (localCardDataParsed[0] != null) {
			if (localCardDataParsed[0].selectedBodyPart == null) {
				arr.fill({ exercise: null, selectedBodyPart: '', isPinned: false });
			} else {
				arr = localCardDataParsed;
			}
		}
		return arr;
	}

	function setLocalCardData(): ExerciseCardData[] {
		if (exerciseCardData[0] != null) {
			localStorage.setItem(LOCAL_STORAGE_CARD_DATA_NAME, JSON.stringify(exerciseCardData));
		}
		return exerciseCardData;
	}

	/**
	 * Fetch all the data we need that will not change.
	 * Data: bodyPart and equipment array
	 */
	useEffect(() => {
		fetchBodyPartAndEquipmentArray();
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

	useEffect(() => {
		setLocalCardData();
	}, [exerciseCardData]);

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
	let handleRemoveExerciseOnClick = (cardID: number): void => {
		setExerciseCardData(exerciseCardData.filter((_item, i) => i !== cardID));
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

	let handleOnClickPin = (cardID: number): void => {
		const newExercises = exerciseCardData.map((item, i) => {
			if (cardID == i) {
				return { ...item, isPinned: !item.isPinned };
			} else {
				return item;
			}
		});
		setExerciseCardData(newExercises);
	};

	let onImageError = (_e: React.SyntheticEvent<HTMLImageElement>, cardID: number): void => {
		fetchCardData(cardID);
	};

	async function fetchCardData(cardID: number) {
		try {
			const FETCH_URL = FULL_API_URL + 'GetByID/' + exerciseCardData[cardID].exercise?.id;
			const FETCH_TIMER_NAME = 'exercise-fetch-data-timer';
			console.log('fetching from ' + FETCH_URL);
			console.time(FETCH_TIMER_NAME);
			const response = await fetch(FETCH_URL);
			const data = await response.json();
			console.log(data);
			if (response.ok) {
				console.log('Successfully fetched in: ');
				console.timeEnd(FETCH_TIMER_NAME);
				const arr = exerciseCardData.map((item, i) => {
					if (i === cardID) {
						return { ...item, exercise: data };
					}
					return item;
				});
				setExerciseCardData(arr);
			} else {
				console.log('Response not ok' + data.message);
				console.timeEnd(FETCH_TIMER_NAME);
			}
		} catch (error) {
			console.log('Error on fetchBodyPartArray:' + error);
		}
	}

	/**
	 *
	 */
	function handleTestClick() {
		const bungus = {
			exercise: {
				_id: '65e3880bdd0996da4963923d',
				bodyPart: 'upper arms',
				equipment: 'body weight',
				gifUrl: 'https://v2.exercisedb.io/image/bo0nCeGrclG0Y4',
				id: 139,
				name: 'biceps narrow pull-ups',
				target: 'biceps',
				secondaryMuscles: ['forearms', 'shoulders'],
				instructions: [
					'Hang from a pull-up bar with your palms facing towards you and your hands shoulder-width apart.',
					'Engage your core and pull yourself up towards the bar, focusing on using your biceps to lift your body.',
					'Pause for a moment at the top, then slowly lower yourself back down to the starting position.',
					'Repeat for the desired number of repetitions.',
				],
			},
			selectedBodyPart: '',
			isPinned: false,
		};

		setExerciseCardData([...exerciseCardData, bungus]);
	}

	///onError of image we call a callback function(e, cardID) where we just ask for the girlUrl with the exercisecarddata[cardID].exercises.id

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
									handleSelectChangeCallback={handleCardSelectChange}
									handleRemoveExerciseOnClickCallback={handleRemoveExerciseOnClick}
									selectBodyPart={item.selectedBodyPart}
									handleOnClickPinCallback={handleOnClickPin}
									isPinned={item.isPinned}
									onImageErrorCallback={onImageError}
								/>
							))}
						</div>
					</div>
					<div className='div-equipment-list'>
						{
							/*ISSUE HERE WHERE RELOADING GIVES A DIFFERENT LIST WHICH UNTICKS BOXES*/
							initData.equipmentArray != null && initData.equipmentArray.length > 0 && initData.equipmentArray[0] != '' ? (
								initData.equipmentArray.map((item) => (
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
				<div style={{ display: 'visible' }}>
					<button className='ex-button' onClick={handleTestClick}>
						Test
					</button>
				</div>
			</div>
		</>
	);
}

export default ExercisePlan;
