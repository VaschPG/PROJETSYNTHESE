import { useState, useEffect } from "react";
import ExerciseCard from "./components/ExerciseCard";
import Exercise from "../../models/Exercise";
import CheckBox from "./components/CheckBox";
import "./ExercisePlan.css";
import ExercisePlanMenu from "./components/ExercisePlanMenu";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
const API_EXERCISES_URL = import.meta.env.VITE_API_EXERCISES_URL;
const FULL_API_URL = BASE_API_URL + API_EXERCISES_URL;
const NB_EXERCISES = 6;
const LOCAL_STORAGE_CARD_DATA_NAME = "exerciseCardData";

/**
 * TODO LIST: --Status-- Task. -Comment
 * --DONE-- Update gifurl when it's busted. -Fixes the issue on broken links from storage and pins C:-Need to do more tests to make sure it's working correctly without the possibility of an infinite loop.
 * Transform fetch calls into custom hooks... You can pass the setBungus from [bungus, setBungus] in a function param, that's crazy.
 *     Ex: function useFetchExercise(id, setData){ -Do the implementation here} and then in our component we just import it and do this: const fetchingState = useFetch(exercise.id, setExercise) and then we can even see if it's loading and stuff.
 * Make the equipment list it's own component.
 * Implement bootstrap.
 * Internationalisation.
 * Implement more info to see all the info of an exercise(By expanding the card, probably only expand one at a time, like when one expands the one that was expanded before goes back to normal size).
 * Implement switching between gif and instructions? Or maybe just add instructions below the gif? ASK EMA
 * Tests
 * DOCUMENT EVERYTHING!
 * Make a const of the default exerciseDataCard and use it/parts of it instead of having that { exercise: null, selectedBodyPart: '', isPinned: false } shit everywhere.
 * Implement saving data to db! (Maybe wait on user/login to be done?)
 */

/**
 *
 */
interface BodyPartAndEquipmentArray {
  bodyPartArray: string[];
  equipmentArray: string[];
}

/**
 * exercise: Exercise | null;
 * selectedBodyPart: string;
 * isPinned: boolean;
 */
interface ExerciseCardData {
  //Remove exercises from this so we don't have to map everytime we load a plan idiot.
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
    bodyPartArray: [""],
    equipmentArray: [""],
  });
  const [checkedEquipmentList, setCheckedEquipmentList] = useState<string[]>(["body weight"]);

  /**
   * Gets the most recent exercise card data we stored in localstorage.
   * @returns ExerciseCardData[] from localstorage
   */
  function getLocalCardData(): ExerciseCardData[] {
    const localCardData = localStorage.getItem(LOCAL_STORAGE_CARD_DATA_NAME);
    let localCardDataParsed;
    if (localCardData != null) {
      localCardDataParsed = JSON.parse(localCardData);
    }
    let arr: ExerciseCardData[] = new Array<ExerciseCardData>(NB_EXERCISES);
    if (localCardDataParsed == null) {
      arr.fill({ exercise: null, selectedBodyPart: "", isPinned: false });
    } else if (localCardDataParsed[0] != null) {
      if (localCardDataParsed[0].selectedBodyPart == null) {
        arr.fill({ exercise: null, selectedBodyPart: "", isPinned: false });
      } else {
        arr = localCardDataParsed;
      }
    }
    return arr;
  }

  /**
   *
   * @returns
   */
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
      if (item.selectedBodyPart === "" || item.selectedBodyPart === undefined) {
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
      const FETCH_URL = FULL_API_URL + "DistinctBodyPartAndEquipmentValues";
      const FETCH_TIMER_NAME = "exercise-initial-data-fetch-timer";
      console.log("fetching from " + FETCH_URL);
      console.time(FETCH_TIMER_NAME);
      const response = await fetch(FETCH_URL, {
        method: "GET",
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Successfully fetched in: ");
        console.timeEnd(FETCH_TIMER_NAME);
        setInitData(data);
      } else {
        console.log("Response not ok" + data.message);
        console.timeEnd(FETCH_TIMER_NAME);
      }
    } catch (error) {
      console.log("Error on fetchBodyPartArray:" + error);
    }
  }

  /**
   * NEED TO ADD A MESSAGE ON RECIEVING NULL SINCE THAT MEANS THERE'S NO EQUIPMENT
   *
   * MEDIUM ISSUE, INTRODUCING PIN MEANS WE NEED TO SEND OVER THE PINNED IDS SO WE CAN MAKE SURE NOT TO GET DUPLICATES.
   */
  async function fetchSpecificExercises() {
    try {
      ///Fetch url info///
      const FETCH_URL = FULL_API_URL + "WithBodyPartsAndEquipmentQuery/?";
      const FETCH_TIMER_NAME = "exercise-fetch-timer";
      console.log("fetching from " + FETCH_URL);

      const params = new URLSearchParams();
      exerciseCardData.map((item) => {
        if (item.isPinned) {
          params.append("bodyPart", "");
        } else {
          params.append("bodyPart", item.selectedBodyPart);
        }
      });
      checkedEquipmentList.map((item) => {
        params.append("equipment", item);
      });

      console.time(FETCH_TIMER_NAME);
      const response = await fetch(FETCH_URL + params);
      const data = await response.json();
      if (response.ok) {
        console.log("Successfully fetched in: ");
        console.timeEnd(FETCH_TIMER_NAME);
        if(exerciseCardData.length > 1){
        const newExercises = data.map((item: ExerciseCardData["exercise"], i: number) => {
          const _exercise = exerciseCardData[i].isPinned ? exerciseCardData[i].exercise : item;
          return {
            exercise: _exercise,
            selectedBodyPart: exerciseCardData[i].selectedBodyPart,
            isPinned: exerciseCardData[i].isPinned,
          };
        });
        
        
        console.log(newExercises);
        setExerciseCardData(newExercises);
        }else{
            const _exercise = exerciseCardData[0].isPinned ? exerciseCardData[0].exercise : data[0];
            setExerciseCardData([{exercise: _exercise, selectedBodyPart: exerciseCardData[0].selectedBodyPart, isPinned: exerciseCardData[0].isPinned}]);
            console.log(data);
        }
        
      } else {
        console.log("Response not ok" + data.message);
        console.timeEnd(FETCH_TIMER_NAME);
      }
    } catch (error) {
      console.log("Error on fetchSpecificExercises:" + error);
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
  const handleCardSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, cardID: number): void => {
    const newExercises = exerciseCardData.map((item, index) => {
      if (cardID === index) {
        return { ...item, selectedBodyPart: e.target.value };
      } else {
        return item;
      }
    });
    setExerciseCardData(newExercises);
  };

  /**
   *
   * @param e
   * @param cardID
   */
  const handleRemoveExerciseOnClick = (cardID: number): void => {
    setExerciseCardData(exerciseCardData.filter((_item, index) => index !== cardID));
  };

  /**
   *
   * @param e
   * @param value
   */
  const handleOnCheckEquipment = (e: React.ChangeEvent<HTMLInputElement>, value: string): void => {
    //Make sure value is not null
    if (value != null) {
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

  const handleOnClickPin = (cardID: number): void => {
    const newExercises = exerciseCardData.map((item, index) => {
      if (cardID === index) {
        return { ...item, isPinned: !item.isPinned };
      } else {
        return item;
      }
    });
    setExerciseCardData(newExercises);
  };

  /**
   * Scary function that asks the db for an updated gifurl in case of an image error(Failure to load the image).
   * @param e onError event of the image
   * @param cardID ID/Index of the card who's image triggered the event.
   */
  const onImageError = (_e: React.SyntheticEvent<HTMLImageElement>, cardID: number): void => {
    fetchCardData(cardID);
    console.log("onErrorCall");
    //e.currentTarget.src = 'https://v2.exercisedb.io/image/aQNsZ6BgDrucvz';
  };

  const handleLoadExercisePlan = (userID: string, planName: string) => {
    fetchExercisePlan(userID, planName);
  };

  const handleSaveExercisePlan = (userID: string, planName: string) => {
    if (planName.trim() != "") {
      fetchSaveExercisePlan(userID, planName);
    }
  };
  /**
   * Fetches the data of the exercise of a specified card using the id of said exercise.
   * Used to refresh the info in the case of a broken gifurl.
   * @param cardID ID/Index of the card who's exercise info we want to fetch
   */
  async function fetchCardData(cardID: number) {
    try {
      const FETCH_URL = FULL_API_URL + "GetByID/" + exerciseCardData[cardID].exercise?._id;
      const FETCH_TIMER_NAME = "exercise-fetch-data-timer";
      console.log("fetching from " + FETCH_URL);
      console.time(FETCH_TIMER_NAME);
      const response = await fetch(FETCH_URL);
      const data = await response.json();
      if (response.ok) {
        console.log("Successfully fetched in: ");
        console.timeEnd(FETCH_TIMER_NAME);
        const arr = exerciseCardData.map((item, index) => {
          if (index === cardID) {
            return { ...item, exercise: data };
          }
          return item;
        });
        setExerciseCardData(arr);
      } else {
        console.log("Response not ok" + data.message);
        console.timeEnd(FETCH_TIMER_NAME);
      }
    } catch (error) {
      console.log("Error on fetchBodyPartArray:" + error);
    }
  }

  async function fetchExercisePlan(userID: string, planName: string) {
    try {
      const FETCH_URL = `${BASE_API_URL}api/profile/GetExercisePlanByName/${userID}/${planName}`;
      const FETCH_TIMER_NAME = "fetch-exercise-plan-data-timer";
      console.log("fetching from " + FETCH_URL);
      console.time(FETCH_TIMER_NAME);
      const response = await fetch(FETCH_URL, {
        method: "GET",
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        console.log("Successfully fetched in: ");
        console.timeEnd(FETCH_TIMER_NAME);
        const toSet: ExerciseCardData[] = data.exercises.map((item: Exercise) => {
          return { exercise: item, selectedBodyPart: item.bodyPart, isPinned: true };
        });
        setExerciseCardData(toSet);
      } else {
        console.log("Response not ok" + data.message);
        console.timeEnd(FETCH_TIMER_NAME);
      }
    } catch (error) {
      console.log("Error on fetchBodyPartArray:" + error);
    }
  }

  async function fetchSaveExercisePlan(userID: string, planName: string) {
    try {
      const FETCH_URL = `${BASE_API_URL}api/profile/UpsertExercisePlan`;
      const FETCH_TIMER_NAME = "fetch-exercise-plan-data-timer";
      console.log("fetching from " + FETCH_URL);
      console.time(FETCH_TIMER_NAME);
      const exercises = exerciseCardData.map((item) => {
        return { _id: item.exercise?._id };
      });
      const sentData = { userID: userID, exercisePlans: { name: planName, exercises: exercises } };
      const response = await fetch(FETCH_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sentData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Successfully fetched in: ");
        console.timeEnd(FETCH_TIMER_NAME);
      } else {
        console.log("Response not ok" + data.message);
        console.timeEnd(FETCH_TIMER_NAME);
      }
    } catch (error) {
      console.log("Error on fetchBodyPartArray:" + error);
    }
  }

  /**
   *
   */
  function handleTestClick() {}

  ///onError of image we call a callback function(e, cardID) where we just ask for the girlUrl with the exercisecarddata[cardID].exercises.id

  return (
    <>
      <div className="exercise-plan-root">
        <section className="ex-header" style={{ display: "inline-block", justifyContent: "normal", alignItems: "center" }}>
          <ExercisePlanMenu
            handlers={{
              handleAdd: handleAddExerciseOnClick,
              handleSearch: handleSearchClick,
              handleLoadExercisePlan: handleLoadExercisePlan,
              handleSaveExercisePlan: handleSaveExercisePlan,
            }}
          />
        </section>
        <section className="section-card-and-equipment-list" style={{ marginTop: "5px" }}>
          <div className="div-div-card">
            <div className="div-card">
              {exerciseCardData.map((item, index) => (
                <ExerciseCard
                  key={index}
                  exercise={item.exercise}
                  bodyPartArray={initData.bodyPartArray}
                  cardID={index}
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
          <div className="div-equipment-list">
            {
              /*ISSUE HERE WHERE RELOADING GIVES A DIFFERENT LIST WHICH UNTICKS BOXES*/
              initData.equipmentArray != null && initData.equipmentArray.length > 0 && initData.equipmentArray[0] != "" ? (
                initData.equipmentArray.map((item) => (
                  <CheckBox
                    key={Object.values(item)[0]}
                    label={Object.values(item)[0]}
                    value={Object.values(item)[0]}
                    handleOnCheck={handleOnCheckEquipment}
                    isDefaultChecked={Object.values(item)[0] === "body weight" ? true : false}
                  />
                ))
              ) : (
                <div>Loading</div>
              )
            }
          </div>
        </section>
        <div style={{ display: "none" }}>
          <button className="ex-button" onClick={handleTestClick}>
            Test
          </button>
        </div>
      </div>
    </>
  );
}

export default ExercisePlan;
