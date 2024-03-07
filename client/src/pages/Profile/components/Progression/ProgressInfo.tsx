import { useEffect, useState } from "react";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
const API_PROGRESSION_URL = import.meta.env.VITE_API_PROGRESSION_URL;
const FULL_API_URL = BASE_API_URL + API_PROGRESSION_URL;
const DEFAULT_DATE_LOCALE = "fr-CA";

interface IProps {
  auth_id: string | undefined;
}

interface Progression {
  date: Date;
  weight: number;
}

interface IProgInfo {
  initialWeight: Progression;
  latestWeight: Progression;
}

function ProgressInfo({ auth_id }: IProps) {
  const [progressionInfo, setProgressionInfo] = useState<IProgInfo>();

  useEffect(() => {
    fetchData();
  }, []);

  function dateFormatter(date: Date | undefined, locale?: string) {
    if (date != null) {
      const formattingOptions: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      if (locale == null) {
        locale = DEFAULT_DATE_LOCALE;
      }
      if (typeof date.getMonth != "function") {
        try {
          date = new Date(date);
          console.log("Not a date");
        } catch (error) {
          console.log(error);
        }
      }
      return date.toLocaleDateString(locale, formattingOptions);
    } else {
      return "Error, date undefined";
    }
  }

  async function fetchData() {
    try {
      const FETCH_URL = FULL_API_URL + "InitialAndLatestWeight/" + auth_id;
      const FETCH_TIMER_NAME = "progression-info-data-fetch-timer";
      console.log("fetching from " + FETCH_URL);
      console.time(FETCH_TIMER_NAME);
      const response = await fetch(FETCH_URL, {
        method: "GET",
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        console.log("Successfully fetched in: ");
        console.timeEnd(FETCH_TIMER_NAME);
        setProgressionInfo(data);
      } else {
        console.log("Response not ok" + data.message);
        console.timeEnd(FETCH_TIMER_NAME);
      }
    } catch (error) {
      console.log("Error on fetchBodyPartArray:" + error);
    }
    console.log(progressionInfo);
  }

  //Fetch initial weight and latest weight
  //Show initial weight, latest weight with the dates and the difference between the 2

  //Refactor this when we do the bootstrap
  return (
    <>
      {progressionInfo?.initialWeight != null && progressionInfo.latestWeight != null && (
        <div>
          <p>
            Poids au debut: {progressionInfo?.initialWeight.weight} kg, le {dateFormatter(progressionInfo?.initialWeight.date)}
          </p>
          <p>
            Poids actuel: {progressionInfo?.latestWeight.weight} kg, le {dateFormatter(progressionInfo?.latestWeight.date)}
          </p>
          <p>Difference de poids: {progressionInfo?.latestWeight.weight - progressionInfo?.initialWeight.weight} kg</p>
        </div>
      )}
    </>
  );
}

export default ProgressInfo;
