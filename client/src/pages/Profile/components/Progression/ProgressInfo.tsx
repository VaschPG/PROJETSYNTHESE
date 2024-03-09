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
        <div>
          <p>
            Poids au debut: {infoData?.initialWeight.weight} kg, le {infoData?.initialWeight.date}
          </p>
          <p>
            Poids actuel: {infoData?.latestWeight.weight} kg, le {infoData?.latestWeight.date}
          </p>
          <p>Difference de poids: {infoData?.initialWeight.weight - infoData?.latestWeight.weight} kg</p>
        </div>
      )}
    </>
  );
}

export default ProgressInfo;
