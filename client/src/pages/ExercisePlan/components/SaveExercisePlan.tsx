import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function SaveExercisePlan() {
  const { user, isLoading, isAuthenticated } = useAuth0();
  const [isShow, setIsShow] = useState(false);
  return (
    <>
      {!isLoading && isAuthenticated ? (
        <div style={{ display: "inline" }}>
          <button
            className="ex-button"
            onClick={() => {
              setIsShow(!isShow);
            }}
            style={{ color: "white", padding: "auto 5px auto 0" }}
          >
            {isShow ? "/\\" : "\\/"}
          </button>
          {/* Put form here */}
          <div style={isShow ? { display: "flex" } : { display: "none" }}>
            <div style={{ padding: "10px", marginBottom: "4px", background: "rgb(55, 47, 109)", border: "1px solid black" }}>
              <div className="ex-select-plan"> </div>
              <div className="ex-save-plan">
                <input name="chef"></input>
                <button className="ex-button" style={{ marginTop: "0", marginBottom: "0", marginRight: "0" }}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <span>LOADING!</span>
      )}
    </>
  );
}

export default SaveExercisePlan;
