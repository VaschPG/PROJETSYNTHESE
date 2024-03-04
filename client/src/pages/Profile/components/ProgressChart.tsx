import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
const data = [
	{ date: '03/03/2024', weight: 90 },
	{ date: '05/03/2024', weight: 95 },
	{ date: '06/03/2024', weight: 92 },
	{ date: '10/03/2024', weight: 89 },
	{ date: '11/03/2024', weight: 86 },
	{ date: '17/03/2024', weight: 87 },
	{ date: '22/03/2024', weight: 87 },
	{ date: '26/03/2024', weight: 83 },
	{ date: '30/03/2024', weight: 81 },
	{ date: '03/04/2024', weight: 78 },
	{ date: '09/04/2024', weight: 72 },
	{ date: '12/04/2024', weight: 70 },
	{ date: '20/04/2024', weight: 75 },
	{ date: '24/04/2024', weight: 73 },
];

function ProgressChart() {
	return (
		<>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<LineChart
					width={500}
					height={500}
					data={data}
					style={{ border: '0.1em solid darkslateblue' }}
					margin={{ top: 40, right: 40, bottom: 25, left: 0 }}
				>
					<CartesianGrid
					/*strokeDasharray='5 5'
						horizontalCoordinatesGenerator={(props) => {
							console.log(props.yAxis);
							return [25, 50, 75, 100];
						}}*/
					/>
					<XAxis dataKey={'date'} />
					<YAxis
						dataKey={'weight'}
						domain={[(dataMin: number) => Math.round(dataMin * 0.95), (dataMax: number) => Math.round(dataMax * 1.03)]}
					/>
					<Tooltip />
					<Legend />
					<Line type='monotone' dataKey={'weight'} stroke='#8884d8' />
				</LineChart>
			</div>
		</>
	);
}
export default ProgressChart;
