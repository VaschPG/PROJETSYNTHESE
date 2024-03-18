import { useEffect, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Spinner } from "react-bootstrap";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
const API_EXERCISES_URL = import.meta.env.VITE_API_PROFILE_URL;
const FULL_API_URL = BASE_API_URL + API_EXERCISES_URL;

interface ExercisePlan {
  name: string;
}

interface IHandlers {
  handleLoadExercisePlan: (userID: string, planName: string) => void;
  handleSaveExercisePlan: (userID: string, planName: string) => void;
  handleSearch: () => void;
  handleAdd: () => void;
}
interface IProps {
  handlers: IHandlers;
}

function ExercisePlanMenu({ handlers: Handler }: IProps) {
  const { user, isLoading, isAuthenticated } = useAuth0();
  const [exercisePlanList, setExercisePlanList] = useState<ExercisePlan[]>([]);
  const [isShow, setIsShow] = useState(false);
  const refSelectPlan = useRef<HTMLSelectElement>(null);
  const refSaveInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      fetchExercisePlanList();
    }
  }, [user]);

  async function fetchExercisePlanList() {
    try {
      const FETCH_URL = `${FULL_API_URL}/GetExercisePlanNames/${user?.sub?.substring(user?.sub.indexOf("|") + 1)}`;
      const FETCH_TIMER_NAME = "plan-names-fetch-timer";
      console.log("fetching from " + FETCH_URL);
      console.time(FETCH_TIMER_NAME);
      const response = await fetch(FETCH_URL, {
        method: "GET",
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Successfully fetched in: ");
        console.timeEnd(FETCH_TIMER_NAME);
        setExercisePlanList(data);
      } else {
        console.log("Response not ok" + data.message);
        console.timeEnd(FETCH_TIMER_NAME);
      }
    } catch (error) {
      console.log("Error on fetchBodyPartArray:" + error);
    }
  }

  function handleRefetchPlanNames() {
    fetchExercisePlanList();
  }

  return (
    <>
      <div style={{ display: "inline" }}>
        <button className="ex-button" onClick={Handler.handleAdd} style={{ marginBottom: "5px" }}>
          +
        </button>
        {!isLoading ? (
          isAuthenticated && (
            <button
              className="ex-button"
              onClick={() => {
                setIsShow(!isShow);
              }}
            >
              {isShow ? "Fermer Menu" : "Ouvrir Menu"}
            </button>
          )
        ) : (
          <button className="ex-button" style={{ display: "inline" }}>
            <Spinner animation="border" role="status" style={{ width: "1em", height: "1em", color: "gray" }}>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </button>
        )}

        <button className="ex-button" onClick={Handler.handleSearch} style={{ marginBottom: "5px" }}>
          Recherche
        </button>
      </div>
      {!isLoading && isAuthenticated && (
        <div style={{ display: "inline" }}>
          {/* Put form here */}
          <div style={isShow ? { display: "" } : { display: "none" }}>
            <div style={{ padding: "10px", marginBottom: "4px", borderRadius: "5px", boxShadow: "0 0 4px 1px grey", alignItems: "center" }}>
              <div className="ex-select-plan">
                <select ref={refSelectPlan}>
                  {exercisePlanList.length > 0 && exercisePlanList.map((item) => <option key={item.name}>{item.name}</option>)}
                </select>
                <button
                  className="ex-button"
                  style={{ marginTop: "0", marginBottom: "0", marginRight: "0", padding: "5px 8px 5px 8px" }}
                  onClick={() => {
                    if (user?.sub != null && refSelectPlan.current != null) {
                      Handler.handleLoadExercisePlan(user?.sub?.substring(user?.sub.indexOf("|") + 1), refSelectPlan.current.value);
                    }
                  }}
                >
                  Charger
                </button>
              </div>
              <div className="ex-save-plan" style={{ marginLeft: "8px" }}>
                {/*Replace this pile of dogshit with a form to validate. */}
                <input name="save-input" required pattern="" ref={refSaveInput}></input>
                <button
                  className="ex-button"
                  style={{ marginTop: "8px", marginBottom: "0", marginRight: "0", padding: "5px 8px 5px 8px" }}
                  onClick={() => {
                    if (user?.sub != null && refSaveInput.current != null) {
                      Handler.handleSaveExercisePlan(user?.sub?.substring(user?.sub.indexOf("|") + 1), refSaveInput.current.value);
                      //Do this better with a callback?
                      handleRefetchPlanNames;
                    }
                  }}
                >
                  Sauvegarder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ExercisePlanMenu;
