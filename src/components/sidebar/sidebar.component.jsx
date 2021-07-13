import React, { useState, useEffect } from "react";

import DataContainer from "../data-container/data-container.component.jsx";
import StateList from "../state-list/state-list.component";
import "./sidebar.styles.css";

const Sidebar = ({ data, currentSelected, handleMouseOver, handleSelect }) => {
	return (
		<div className="sidebar">
			<select id="date-data" onChange={handleSelect}>
				{data.map((d, idx) => (
					<DataContainer data={d} key={d.date} value={idx} />
				))}
			</select>
			<label>Select the date to display COVID data for.</label>
			<div className="covid-data">
				{currentSelected
					? Object.entries(currentSelected.data).map((ob, idx) => (
							<StateList
								state={ob[0]}
								active={ob[1].active}
								death={ob[1].death}
								handleMouseOver={(e, state) =>
									handleMouseOver(e, state)
								}
								key={idx}
							/>
					  ))
					: "not found"}
			</div>
		</div>
	);
};

export default Sidebar;
