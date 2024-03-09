import { useEffect, useState } from "react";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
const API_PROGRESSION_URL = import.meta.env.VITE_API_PROGRESSION_URL;
const FULL_API_URL = BASE_API_URL + API_PROGRESSION_URL;
const DEFAULT_DATE_LOCALE = "fr-CA";

interface IProps {
  progressionInfo?: IProgressionInfo;
}

interface Progression {
  date: Date;
  weight: number;
}

interface IProgressionInfo {
  initialWeight: Progression;
  latestWeight: Progression;
}

function ProgressInfo({ progressionInfo }: IProps) {
  //Fetch initial weight and latest weight
  //Show initial weight, latest weight with the dates and the difference between the 2

  //Refactor this when we do the bootstrap
  return (
    <>
      {progressionInfo?.initialWeight != null && progressionInfo.latestWeight != null && (
        <div>
          <p>
            Poids au debut: {progressionInfo?.initialWeight.weight} kg, le {}
          </p>
          <p>
            Poids actuel: {progressionInfo?.latestWeight.weight} kg, le {}
          </p>
          <p>Difference de poids: {progressionInfo?.latestWeight.weight - progressionInfo?.initialWeight.weight} kg</p>
        </div>
      )}
    </>
  );
}

export default ProgressInfo;
