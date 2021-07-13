import { useState, useEffect } from "react";

import "./App.css";
import MapSvg from "./components/map/map.component.jsx";
import Sidebar from "./components/sidebar/sidebar.component";
import Spinner from "./components/spinner/spinner.component";
import BarGraph from "./components/bar-graph/bargraph.component.jsx";

function App() {
	const [covidCases, updateCovidCases] = useState([]);
	const [currentSelected, updateCurrentSelected] = useState();
	const [currentState, updateCurrentState] = useState();

	const handleMouseOver = (stateName) => {
		updateCurrentState(stateName);
		var stateOnMap = document.getElementsByTagName("path");
		var arr = Array.prototype.slice.call(stateOnMap);
		arr.forEach((e) => {
			if (e.id === stateName) {
				if (document.getElementById(e.id))
					document.getElementById(e.id).style.fill = "green";
			} else {
				if (document.getElementById(e.id))
					document.getElementById(e.id).style.fill = "darkcyan";
			}
		});
	};

	const handleClick = () => {
		let map = document.getElementsByClassName("map-container");
		let graph = document.getElementsByClassName("bar-container");
		console.log("CLICK");
		map[0].classList.toggle("hidden");
		map[0].classList.toggle("show");
		graph[0].classList.toggle("hidden");
		graph[0].classList.toggle("show");
	};

	const handleSelect = (e) => {
		let selectedDate = document.getElementById(e.target.value).innerText;
		updateCurrentSelected(
			covidCases.filter((ob) => ob.date === selectedDate)[0]
		);
		console.log(currentSelected);
	};

	const fetchData = async () => {
		const fetchedData = await fetch("http://localhost:5000/data", {
			headers: {
				"content-type": "application/json",
			},
		});
		let data = await fetchedData.json();
		data = data.sort((a, b) => new Date(b.date) - new Date(a.date));
		setTimeout(() => {
			updateCovidCases(data);
			updateCurrentSelected(data[0]);
		}, 0);
	};
	//const date = new Date("Sun Nov 15 2020");
	useEffect(() => {
		fetchData();
		// handleClick();
	}, []);
	if (covidCases.length > 0)
		return (
			<div className="main-container">
				<div className="toggle" onMouseDown={handleClick}>
					Toggle View
				</div>
				<div className="map-container show">
					<MapSvg
						getClickedStateName={(state) =>
							getClickedStateName(state)
						}
						currentState={currentState}
					/>
				</div>
				<div className="bar-container hidden">
					<BarGraph currentSelected={currentSelected} />
				</div>
				<Sidebar
					data={covidCases}
					currentSelected={currentSelected}
					updateCurrent={(data) => updateCurrentSelected(data)}
					handleMouseOver={handleMouseOver}
					handleSelect={handleSelect}
				/>
			</div>
		);
	else return <Spinner />;
}
const getClickedStateName = (stateName) => {
	console.log(stateName);
};
export default App;
