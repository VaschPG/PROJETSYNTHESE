import { useState, useEffect } from 'react';
import ExerciseCard from '../../components/ExerciseCard';
import Exercise from '../../models/Exercise';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const NBEXERCISES = 6;

function App() {
  const [nbExercises, setNbExercises] = useState(NBEXERCISES);
  const [exercises, setExercises] = useState(new Array<Exercise>(nbExercises));


  async function handleClick(){
    getNewExercises();
  }

  async function getNewExercises(){
    try{
      console.log('fetching from ' + BASE_URL);
      const response = await fetch(BASE_URL + '/testGabe/getRandomExercises/' + nbExercises, { method: 'GET' });
      const data = await response.json();
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

  function handleNbExercisesChange(e:any){
    setNbExercises(e.target.value);
  }

  return (
    <>
      <input type='number' placeholder='6' value={nbExercises} onChange={handleNbExercisesChange}></input>
      <button onClick={ handleClick }>Get new exercises</button>
      <div className='container card'>
        { exercises.map( (item, i) => (<ExerciseCard key={ i } exercise={item}/>)) }
      </div>
    </>
  )
}




export default App
