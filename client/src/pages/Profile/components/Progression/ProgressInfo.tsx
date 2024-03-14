import { useEffect, useState } from "react";

interface Progression {
  date: string;
  weight: number;
}

interface IProps {
  propData: Progression[];
}

interface InfoData {
  initialWeight: Progression;
  latestWeight: Progression;
}

function ProgressInfo({ propData }: IProps) {
  const [infoData, setInfoData] = useState<InfoData>();

  useEffect(() => {
    if (propData != null && propData.length > 0) {
      setInfoData({ initialWeight: propData[0], latestWeight: propData[propData.length - 1] });
    }
  }, [propData]);

  //Refactor this when we do the bootstrap
  return (
    <>
      {infoData != null && (
        <div
          style={{
            background: "#004d95",
            color: "white",
            border: "solid 1px black",
            borderRadius: "5px",
            padding: "5px",
            margin: "auto",
            textAlign: "center",
          }}
        >
          <h5>
            Poids au debut: {infoData?.initialWeight.weight} kg, le {infoData?.initialWeight.date}
          </h5>
          <h5>
            Poids actuel: {infoData?.latestWeight.weight} kg, le {infoData?.latestWeight.date}
          </h5>
          <h5>Difference de poids: {infoData?.latestWeight.weight - infoData?.initialWeight.weight} kg</h5>
        </div>
      )}
    </>
  );
}

export default ProgressInfo;
