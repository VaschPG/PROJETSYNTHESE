import { useState } from 'react';
import ExerciseCard from './components/ExerciseCard';
import Exercise from '../../models/Exercise';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const NB_EXERCISES = 6;
const GET_RANDOM_EXERCISES_URL = '/api/getRandomExercises/';

function App() {
	const [nbExercises, setNbExercises] = useState(NB_EXERCISES);
	const [exercises, setExercises] = useState(new Array<Exercise>(nbExercises));

	/**
	 * On click event handler for the search button
	 * Calls getNewExercises to fetch exercises from our back end and add them to exercises state object.
	 */
	async function handleSearchClick() {
		getNewExercises();
	}

	/**
	 * Fetch new exercises from our back-end
	 */
	async function getNewExercises() {
		try {
			console.log('fetching from ' + BASE_URL);
			console.time('fetch-timer');
			const response = await fetch(BASE_URL + GET_RANDOM_EXERCISES_URL + nbExercises, {
				method: 'GET',
			});
			const data = await response.json();
			console.log('Successfully fetching in: ');
			console.timeEnd('fetch-timer');
			if (response.ok) {
				setExercises(data);
			} else {
				console.log('Response not ok');
			}
		} catch (error) {
			console.log(error);
			console.log('catch');
		}
	}

	/**
	 * Test function that handles test button and calls test function.
	 */
	function handleTestClick() {
		getSpecificExercises();
	}

	/**
	 * test function
	 * TODO: Delete this later.
	 */
	async function getSpecificExercises() {
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
			console.log('Successfully fetching in: ');
			console.timeEnd('fetch-timer');
			if (response.ok) {
				console.log(data);
			} else {
				console.log('Response not ok');
			}
		} catch (error) {
			console.log(error);
			console.log('catch');
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
			<button onClick={handleTestClick} disabled={true}>
				Test
			</button>
			<button className='button' onClick={handleSearchClick}>
				Get new exercises
			</button>
			<div className='container card'>
				{exercises.map((item, i) => (
					<ExerciseCard key={i} exercise={item} />
				))}
			</div>
		</>
	);
}

export default App;
