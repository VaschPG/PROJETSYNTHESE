import { useState, useEffect } from 'react';
import ExerciseCard from '../../components/ExerciseCard';
import Exercise from '../../models/Exercise';
const NBEXERCISES = 6;
/*
function fillArr(){
  arr.pop();
  
  for(let i = 0; i < NBEXERCISES; i++){
    arr.push(getRandomExercise());
    console.log('fillingArr')
  }
}

async function fetchEx(bodyPart:string){}

async function getRandomExercise(bodyPart: string): Exercise{
  const response = await fetch('http://localhost:3500/testGabe/getRandomFromBodyPart/waist', {method: 'GET'})
  const { data, errors } = await response.json();
  if(response.ok){
    console.log(data);
  }
  //return await response.json();
  return new Exercise('','','',1,'','',[],[]);

}*/

function App() {
  const [nbExercises, setNbExercises] = useState(NBEXERCISES);
  const [exercises, setExercises] = useState(new Array<Exercise>(6));

  async function handleClick(){
    try{
      console.log('fetching');
      const response = await fetch('http://localhost:3500/testGabe/getRandomExercises/' + nbExercises, { method: 'GET' });
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

  return (
    <>
      <button onClick={ handleClick }>Get new exercises</button>
      <div className='container card'>
        { exercises.map( (item, i) => (<ExerciseCard key={ i } exercise={item}/>)) }
      </div>
    </>
  )
}




export default App
