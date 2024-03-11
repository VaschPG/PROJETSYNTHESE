import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import ProgressInfo from "./ProgressInfo";
import ProgressForm from "./ProgressForm";
import { dateFormatter } from "../../../../helpers/FormattingUtils";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
const API_PROGRESSION_URL = import.meta.env.VITE_API_PROGRESSION_URL;
const FULL_API_URL = BASE_API_URL + API_PROGRESSION_URL;

interface Progression {
  date: string;
  weight: number;
}

interface ProgressionData {
  progressionData: Progression[];
}

interface IProps {
  auth_id: string | undefined;
}

function ProgressChart({ auth_id }: IProps) {
  const [chartData, setChartData] = useState<ProgressionData>({ progressionData: new Array<Progression>() });

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
          progressionData: data.progression.map((item: { date: Date; weight: number }) => {
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

  return (
    <>
      {auth_id != null && (
        <div style={{ display: "flex"}}>
            <div style={{margin:"30px 50px 0px 30px"}}>
              <ProgressForm auth_id={auth_id} updateDataHandler={handleUpdateData} />
              <ProgressInfo propData={chartData?.progressionData} />
            </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {chartData != null && chartData?.progressionData?.length > 0 && (
              <LineChart
                width={700}
                height={500}
                data={chartData.progressionData}
                style={{ border: "0.1em solid darkslateblue", backgroundColor: "#E6E5F1"}}
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
