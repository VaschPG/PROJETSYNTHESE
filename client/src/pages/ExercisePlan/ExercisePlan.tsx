import { useState, useEffect } from "react";
import ExerciseCard from "./components/ExerciseCard";
import Exercise from "../../models/Exercise";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const NB_EXERCISES = 6;
const GET_RANDOM_EXERCISES_URL = "/api/getRandomExercises/";

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

function App() {
  const [nbExercises, setNbExercises] = useState(NB_EXERCISES);
  const [exercises, setExercises] = useState(
    new Array<ExerciseCardData>(nbExercises)
  );
  const [initData, setInitData] = useState<BodyPartAndEquipmentArray>({
    bodyPartArray: ["", ""],
    equipmentArray: ["", ""],
  });

  /**
   * Fetch all the data we need that will not change.
   * Data: bodyPart and equipment array
   */
  useEffect(() => {
    fetchBodyPartAndEquipmentArray();
    const arr = exercises;
    if (arr[0] === undefined) {
      arr.fill({ exercise: null, selectedBodyPart: "" });
    }
    setExercises(arr);
  }, []);

  /**
   * When initData changes we change the value of exercises.selectedBodyPart to be the first element in the array if they're undefined or an empty string.
   */
  useEffect(() => {
    const arr = exercises.map((item) => {
      if (item.selectedBodyPart == "" || item.selectedBodyPart == undefined) {
        return {
          exercise: item.exercise,
          selectedBodyPart: Object.values(initData.bodyPartArray[0])[0],
        };
      } else {
        return {
          exercise: item.exercise,
          selectedBodyPart: item.selectedBodyPart,
        };
      }
    });
    setExercises(arr);
  }, [initData.bodyPartArray]);

  /**
   * There has to be a better way to do this.
   * Fill exercise array with dummy Exercises on the first render of this page so that we can render empty exercise cards.
   */
  //useEffect(() => {}, []);

  /**
   * Fetches the list of all distinct values of bodyParts and equipment in our database
   */
  async function fetchBodyPartAndEquipmentArray() {
    try {
      console.log(
        "fetching from " + BASE_URL + "/api/getBodyPartAndEquipmentArray"
      );
      console.time("initial-data-fetch-timer");
      const response = await fetch(
        BASE_URL + "/api/getBodyPartAndEquipmentArray",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log("Successfully fetched in: ");
      console.timeEnd("initial-data-fetch-timer");
      if (response.ok) {
        setInitData(data);
      } else {
        console.log("Response not ok");
      }
    } catch (error) {
      console.log("Error on fetchBodyPartArray:" + error);
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
   * Fetch new exercises from our back-end
   */
  async function fetchNewExercises() {
    try {
      console.log("fetching from " + BASE_URL);
      console.time("fetch-timer");
      const response = await fetch(
        BASE_URL + GET_RANDOM_EXERCISES_URL + nbExercises,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log("Successfully fetched in: ");
      console.timeEnd("fetch-timer");
      if (response.ok) {
        const newExercises = data.map((item: ExerciseCardData, i: number) => {
          return {
            exercise: item,
            selectedBodyPart: exercises[i].selectedBodyPart,
          };
        });
        setExercises(newExercises);
      } else {
        console.log("Response not ok");
      }
    } catch (error) {
      console.log("Error on fetchNewExercises:" + error);
    }
  }

  /**
   * Test function that handles test button and calls test function.
   */
  function handleTestClick() {
    fetchSpecificExercises();
    //fetchBodyPartAndEquipmentArray();
  }

  /**
   *
   */
  async function fetchSpecificExercises() {
    try {
      const params = new URLSearchParams();
      const bodyPartArray = exercises.map((item) => {
        params.append("bodyPart", item.selectedBodyPart);
      });
      console.log("fetching from " + BASE_URL);
      console.time("fetch-timer");
      const response = await fetch(
        BASE_URL + "/api/getExercisesByBodyPartQuery/?" + params
      );
      const data = await response.json();
      console.log("Successfully fetched in: ");
      console.timeEnd("fetch-timer");
      if (response.ok) {
        const newExercises = data.map((item: ExerciseCardData, i: number) => {
          return {
            exercise: item,
            selectedBodyPart: exercises[i].selectedBodyPart,
          };
        });
        setExercises(newExercises);
      } else {
        console.log("Response not ok");
      }
    } catch (error) {
      console.log("Error on fetchSpecificExercises:" + error);
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

  const handleCardSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    cardID: number
  ): void => {
    const newExercises = exercises.map((item, i) => {
      if (cardID == i) {
        return { exercise: item.exercise, selectedBodyPart: e.target.value };
      } else {
        return {
          exercise: item.exercise,
          selectedBodyPart: item.selectedBodyPart,
        };
      }
    });
    setExercises(newExercises);
  };

  function handleChangeNbClick() {
    fetchNewExercises();
  }

  return (
    <>
      <Container>
        <Form.Control
          style={{ width: "auto", display: "inline" }}
          className="bg-secondary text-light"
          type="number"
          placeholder="6"
          value={nbExercises}
          onChange={handleNbExercisesChange}
          min="1"
          max="10"
        ></Form.Control>
        <Button className="button btn-dark" onClick={handleChangeNbClick}>
          Change number of exercises(Doesn't care about selected body part)
        </Button>
        <Button className="button btn-dark" onClick={handleSearchClick}>
          Get exercises based on body part selected
        </Button>
        <Container>
          <Card>
            {exercises.map((item, i) => (
              <ExerciseCard
                key={i}
                exercise={item.exercise}
                bodyPartArray={initData.bodyPartArray}
                cardID={i}
                handleSelectChange={handleCardSelectChange}
              />
            ))}
          </Card>
        </Container>
        <Button className="button btn-dark" onClick={handleTestClick}>
          Test
        </Button>
      </Container>
    </>
  );
}

export default App;
