interface IProps {
  label: string;
  value: string;
  handleOnCheck: (e: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  isDefaultChecked?: boolean;
}

function CheckBox({ label, value, handleOnCheck, isDefaultChecked }: IProps) {
  return (
    <>
      <div className="div-equipment">
        <label className="label-equipment">
          {label}
          <input className="checkbox-equipment" type="checkbox" onChange={(e) => handleOnCheck(e, value)} defaultChecked={isDefaultChecked}></input>
        </label>
      </div>
    </>
  );
}

export default CheckBox;
