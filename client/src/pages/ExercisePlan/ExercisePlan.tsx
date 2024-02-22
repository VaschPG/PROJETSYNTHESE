import { useState } from 'react';
import ExerciseCard from '../../components/ExerciseCard';
import Exercise from '../../models/Exercise';

let fakeExerciseDB = [
  new Exercise(7, 'alternate lateral pulldown', 'cable', 'https://v2.exercisedb.io/image/nu49rfV054HZ0d', 'back'),
  new Exercise(3293, 'archer pull up', 'body weight', 'https://v2.exercisedb.io/image/XctQDLeRc80gSD', 'back'),
  new Exercise(1, '3/4 sit-up', 'body weight', 'https://v2.exercisedb.io/image/TkoOSCuhS37DYY', 'waist'),
  new Exercise(1512, 'all fours squad stretch', 'body weight', 'https://v2.exercisedb.io/image/YdLOOdiYOau-xf', 'upper legs'),
  new Exercise(1368, 'ankle circles', 'body weight', 'https://v2.exercisedb.io/image/hlw8NxVgMLYv5S', 'lower legs'),
  new Exercise(3294, 'archer push up', 'body weight', 'https://v2.exercisedb.io/image/WZkGTUPsd6NXoh', 'chest'),
  new Exercise(994, 'band reversse wrist curl', 'band', 'https://v2.exercisedb.io/image/7chGsVIa0yIaVp', 'lower arms')
]

let arr:Exercise[] = [];

function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function fillArr(){
  arr.pop();
  const NBEXERCISES = 6;
  for(let i = 0; i < NBEXERCISES; i++){
    arr.push(getRandomExercise());
    console.log('fillingArr')
  }
}

function getRandomExercise(): Exercise{
  let i = getRandomInt(0, fakeExerciseDB.length);
  console.log('getRandomEx' + i)
  return fakeExerciseDB[i];
}


function App() {
  if(arr.length == 0){
    fillArr();
  }
  const [exerciseDB, setExerciseDB] = useState(arr);

  function handleClick()
  {
    console.log("update")
    const newArr = exerciseDB.map( exercise => {
      return getRandomExercise();
    })
    setExerciseDB(newArr);
  }

  return (
    <>
      <button onClick={ handleClick }>Get new exercises</button>
      <div className='container card'>
        { exerciseDB.map( (item, i) => (<ExerciseCard key={ i } exercise={item}/>)) }
      </div>
    </>
  )
}




export default App
