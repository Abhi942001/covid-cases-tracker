import React from "react";
import { Chart } from "react-google-charts";
import Spinner from "../spinner/spinner.component.jsx";
import "./bargraph.styles.css";

const BarGraph = ({ currentSelected }) => {
	const data = [];
	const options = {
		title: "Top 6 Covid-19 Cases per State",
		hAxis: {
			title: "Cases",
			minValue: 0,
		},
		vAxis: {
			title: "State",
		},
		responsive: true,
	};
	if (currentSelected) {
		let topFive = Object.keys(currentSelected.data).map(function (key) {
			return [key, currentSelected.data[key]];
		});
		// topFive.sort((a, b) => a.active - b.active);
		topFive.sort(function (first, second) {
			return parseInt(second[1]["active"]) - parseInt(first[1]["active"]);
		});
		console.log(currentSelected.data);
		data.push(["State", "Active cases", "Deaths"]);
		// Object.entries(currentSelected.data).map((ob, idx) =>
		// 	data.push([
		// 		ob[0],
		// 		parseInt(ob[1].active, 10),
		// 		parseInt(ob[1].death, 10),
		// 	])
		// );
		topFive = topFive.slice(0, 6);
		const topFiveBarData = [];
		topFive.forEach((item) => {
			topFiveBarData.push([
				item[0],
				parseInt(item[1]["active"]),
				parseInt(item[1]["death"]),
			]);
		});
		data.push(...topFiveBarData);
	}

	if (data.length > 1) {
		return (
			<div className="bar">
				<Chart
					chartType="BarChart"
					width="100%"
					height="100%"
					data={data}
					options={options}
				/>
			</div>
		);
	} else return <Spinner />;
};

export default BarGraph;

/* <Chart
  width={'500px'}
  height={'300px'}
  chartType="BarChart"
  loader={<div>Loading Chart</div>}
  data={[
    ['City', '2010 Population', '2000 Population'],
    ['New York City, NY', 8175000, 8008000],  
    ['Los Angeles, CA', 3792000, 3694000],
    ['Chicago, IL', 2695000, 2896000],
    ['Houston, TX', 2099000, 1953000],
    ['Philadelphia, PA', 1526000, 1517000],
  ]}
  options={{
    title: 'Population of Largest U.S. Cities',
    chartArea: { width: '50%' },
    hAxis: {
      title: 'Total Population',
      minValue: 0,
    },
    vAxis: {
      title: 'City',
    },
  }}
  // For tests
  rootProps={{ 'data-testid': '1' }}
/> */
