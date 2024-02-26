import { useState, useEffect } from 'react';
import ExerciseCard from './components/ExerciseCard';
import Exercise from '../../models/Exercise';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const NB_EXERCISES = 6;
const GET_RANDOM_EXERCISES_URL = '/api/getRandomExercises/';

/**
 *
 */
interface BodyPartsAndEquipmentArray {
	bodyPart: string[];
	equipment: string[];
}

function App() {
	const [nbExercises, setNbExercises] = useState(NB_EXERCISES);
	const [exercises, setExercises] = useState(new Array<Exercise | null>(nbExercises));
	const [testData, setTestData] = useState<BodyPartsAndEquipmentArray | null>(null);

	/**
	 * Fetch all the data we need that will not change.
	 * Data: bodyPart and equipment array
	 */
	useEffect(() => {
		fetchBodyPartAndEquipmentArray();
	}, []);

	/**
	 * There has to be a better way to do this.
	 * Fill exercise array with dummy Exercises on the first render of this page so that we can render empty exercise cards.
	 */
	useEffect(() => {
		const arr = exercises;
		arr.fill(null);
	}, []);

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
				setTestData(data);
			} else {
				console.log('Response not ok');
			}
		} catch (error) {
			console.log('Error on fetchBodyPartArray:' + error);
		}
	}

	/**
	 * On click event handler for the search button
	 * Calls getNewExercises to fetch exercises from our back end and add them to exercises state object.
	 */
	function handleSearchClick() {
		fetchNewExercises();
	}

	/**
	 * Fetch new exercises from our back-end
	 */
	async function fetchNewExercises() {
		try {
			console.log('fetching from ' + BASE_URL);
			console.time('fetch-timer');
			const response = await fetch(BASE_URL + GET_RANDOM_EXERCISES_URL + nbExercises, {
				method: 'GET',
			});
			const data = await response.json();
			console.log('Successfully fetched in: ');
			console.timeEnd('fetch-timer');
			if (response.ok) {
				setExercises(data);
			} else {
				console.log('Response not ok');
			}
		} catch (error) {
			console.log('Error on fetchNewExercises:' + error);
		}
	}

	/**
	 * Test function that handles test button and calls test function.
	 */
	function handleTestClick() {
		//fetchSpecificExercises();
		//fetchBodyPartAndEquipmentArray();
	}

	/**
	 *
	 */
	async function fetchSpecificExercises() {
		try {
			const testEquipArr = ['cable', 'body weight', 'barbell'];
			let params = new URLSearchParams();
			testEquipArr.forEach((element) => {
				params.append('equipment', element);
			});
			console.log(params);

			console.log('fetching from ' + BASE_URL);
			console.time('fetch-timer');
			const response = await fetch(BASE_URL + '/api/testQuery/?' + params);
			const data = await response.json();
			console.log('Successfully fetched in: ');
			console.timeEnd('fetch-timer');
			if (response.ok) {
				console.log(data);
			} else {
				console.log('Response not ok');
			}
		} catch (error) {
			console.log('Error on fetchSpecificExercises:' + error);
		}
	}

	/**
	 * Change the number of exercises to the amount in the nbExercises input when the input text changes.
	 * @param e nbExercises number input
	 */
	function handleNbExercisesChange(e: React.ChangeEvent<HTMLInputElement>) {
		const inputValue = +e.target.value;
		if (inputValue != null) {
			setNbExercises(inputValue);
		}
	}

	return (
		<>
			<input type='number' placeholder='6' value={nbExercises} onChange={handleNbExercisesChange} min='1' max='10'></input>

			<button className='button' onClick={handleSearchClick}>
				Get new exercises
			</button>
			<div className='container card'>
				{exercises.map((item, i) => (
					<ExerciseCard key={i} exercise={item} bodyPartsArray={testData} />
				))}
			</div>
			<div style={{ display: 'contents' }}>
				<button className='button' onClick={handleTestClick}>
					Test
				</button>
			</div>
		</>
	);
}

export default App;
