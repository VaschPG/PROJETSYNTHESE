interface IProps {
	label: string;
	value: any;
	handleOnCheck: (e: React.ChangeEvent<HTMLInputElement>, value: any) => void;
}

function CheckBox({ label, value, handleOnCheck }: IProps) {
	return (
		<>
			<div className='div-equipment'>
				<label className='label-equipment'>
					{label}
					<input type='checkbox' onChange={(e) => handleOnCheck(e, value)}></input>
				</label>
			</div>
		</>
	);
}

export default CheckBox;
