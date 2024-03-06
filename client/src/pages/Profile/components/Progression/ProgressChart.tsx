import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import ProgressForm from "./ProgressForm";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
const API_PROGRESSION_URL = import.meta.env.VITE_API_PROGRESSION_URL;
const FULL_API_URL = BASE_API_URL + API_PROGRESSION_URL;
const DEFAULT_DATE_LOCALE = "fr-CA";

//Replace this with a class that formats the date better
interface ProgressionData {
  date: Date;
  weight: number;
}

interface Progression {
  progression: ProgressionData[];
}

function ProgressChart() {
  const [chartData, setChartData] = useState<Progression>();
  /*const dateRange = useMemo(() => {
    if(chartData?.progression != null && chartData.progression.length > 0){
        const dayInMs = 24*60*60*1000//One day in miliseconds 
        return (Math.floor((chartData.progression[0].date.getTime() - chartData.progression[chartData.progression.length-1].date.getTime())/dayInMs))
    }
  }, [chartData]);*/

  useEffect(() => {
    fetchProgressionData(2);
  }, []);

  useEffect(() => {
    chartData?.progression?.map((item) => {
      console.log(dateFormatter(item.date));
    });
  }, [chartData]);

  function dateFormatter(date: Date, locale?: string) {
    const formattingOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    if (locale == null) {
      locale = DEFAULT_DATE_LOCALE;
    }
    if (typeof date.getMonth != "function") {
      date = new Date(date);
      console.log("Not a date");
    }
    return date.toLocaleDateString(locale, formattingOptions);
  }

  async function fetchProgressionData(userID: number) {
    try {
      const FETCH_URL = FULL_API_URL + "GetAllOfUser/" + userID;
      const FETCH_TIMER_NAME = "chart-data-fetch-timer";
      console.log("fetching from " + FETCH_URL);
      console.time(FETCH_TIMER_NAME);
      const response = await fetch(FETCH_URL, {
        method: "GET",
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Successfully fetched in: ");
        console.timeEnd(FETCH_TIMER_NAME);
        setChartData({ ...data, progression: formatChartDate(data) });
      } else {
        console.log("Response not ok" + data.message);
        console.timeEnd(FETCH_TIMER_NAME);
      }
    } catch (error) {
      console.log("Error on fetchBodyPartArray:" + error);
    }
  }

  function formatChartDate(data: Progression) {
    const newProgression = data.progression.map((item) => {
      return { ...item, date: dateFormatter(item.date) };
    });
    return newProgression;
  }

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {chartData != null && chartData?.progression?.length > 0 && (
            <LineChart
              width={500}
              height={500}
              data={chartData.progression}
              style={{ border: "0.1em solid darkslateblue", backgroundColor: "white" }}
              margin={{ top: 40, right: 40, bottom: 25, left: 0 }}
            >
              <CartesianGrid />
              <XAxis dataKey={"date"} />
              <YAxis dataKey={"weight"} domain={[(dataMin: number) => Math.round(dataMin * 0.95), (dataMax: number) => Math.round(dataMax * 1.03)]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={"weight"} stroke="#8884d8" />
            </LineChart>
          )}
        </div>
        <div style={{ width: "500px", margin: "auto", justifyContent: "center" }}>
          <ProgressForm />
        </div>
      </div>
    </>
  );
}
export default ProgressChart;
