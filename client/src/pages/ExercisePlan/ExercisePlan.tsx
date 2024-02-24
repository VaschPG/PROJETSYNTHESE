import { useState, useEffect } from 'react';
import ExerciseCard from './components/ExerciseCard';
import Exercise from '../../models/Exercise';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const NBEXERCISES = 6;

function App() {
  const [nbExercises, setNbExercises] = useState(NBEXERCISES);
  const [exercises, setExercises] = useState(new Array<Exercise>(nbExercises));

  /**
   * On click event handler for the search button
   * Calls getNewExercises to fetch exercises from our back end and add them to exercises state object.
   */
  async function handleSearchClick(){
    getNewExercises();
  }

  async function getNewExercises(){
    try{
      console.log('fetching from ' + BASE_URL);
      console.time('fetch-timer');
      const response = await fetch(BASE_URL + '/testGabe/getRandomExercises/' + nbExercises, { method: 'GET' });
      const data = await response.json();
      console.log('Successfully fetching in: ')
      console.timeEnd('fetch-timer');
      if(response.ok){
        setExercises(data);
      }else{
        console.log('Response not ok')
      }
    }catch(error){
      console.log(error);
      console.log('catch');
    }
  }

  /**
   * Change the number of exercises to the amount in the nbExercises input when the input text changes.
   * @param e nbExercises number input
   */
  function handleNbExercisesChange(e: React.ChangeEvent<HTMLInputElement>){
    const inputValue = +e.target.value;
    if(inputValue != null && inputValue != 0){
      setNbExercises(inputValue);
    }else{

    }
  }

  return (
    <>
      <input type='number' placeholder='6' value={nbExercises} onChange={handleNbExercisesChange} min="1" max="10"></input>
      <button className='button' onClick={ handleSearchClick }>Get new exercises</button>
      <div className='container card'>
        { exercises.map( (item, i) => (<ExerciseCard key={ i } exercise={item}/>)) }
      </div>
    </>
  )
}

export default App
