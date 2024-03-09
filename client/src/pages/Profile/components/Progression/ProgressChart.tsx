import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import ProgressInfo from "./ProgressInfo";
import ProgressForm from "./ProgressForm";
import { dateFormatter } from "../../../../utils/Utils";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
const API_PROGRESSION_URL = import.meta.env.VITE_API_PROGRESSION_URL;
const FULL_API_URL = BASE_API_URL + API_PROGRESSION_URL;

//Replace this with a class that formats the date better
interface ProgressionData {
  date: string;
  weight: number;
}

interface Progression {
  progression: ProgressionData[];
}

interface IProps {
  auth_id: string | undefined;
}

function ProgressChart({ auth_id }: IProps) {
  const [chartData, setChartData] = useState<Progression>({ progression: new Array<ProgressionData>() });

  useEffect(() => {
    fetchProgressionData();
  }, []);

  async function fetchProgressionData() {
    try {
      const FETCH_URL = FULL_API_URL + "GetAllOfUser/" + auth_id;
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
        const newchartData = {
          ...chartData,
          progression: data.progression.map((item: { date: Date; weight: number }) => {
            return { date: dateFormatter(item.date), weight: item.weight };
          }),
        };
        setChartData(newchartData);
      } else {
        console.log("Response not ok" + data.message);
        console.timeEnd(FETCH_TIMER_NAME);
      }
    } catch (error) {
      console.log("Error on fetchBodyPartArray:" + error);
    }
  }

  const handleUpdateData = () => {
    fetchProgressionData();
  };

  //initialWeight={chartData?.progression[0]} latestWeight={chartData?.progression[chartData?.progression?.length]}
  return (
    <>
      {auth_id != null && (
        <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
          <div>
            <ProgressForm auth_id={auth_id} updateDataHandler={handleUpdateData} />
            <ProgressInfo propData={chartData?.progression} />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {chartData != null && chartData?.progression?.length > 0 && (
              <LineChart
                width={500}
                height={500}
                data={chartData.progression}
                style={{ border: "0.1em solid darkslateblue", backgroundColor: "white" }}
              >
                <XAxis dataKey={"date"} />
                <YAxis
                  dataKey={"weight"}
                  domain={[(dataMin: number) => Math.round((dataMin * 0.95) / 5) * 5, (dataMax: number) => Math.round((dataMax * 1.03) / 5) * 5]}
                />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={"weight"} stroke="#8884d8" />
              </LineChart>
            )}
          </div>
        </div>
      )}
    </>
  );
}
export default ProgressChart;
