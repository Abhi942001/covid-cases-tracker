import React, { useState, useEffect } from "react";
import "./state-list.styles.css";
const StateList = ({ state, active, death, handleMouseOver }) => {
	return (
		<div
			className="container"
			onMouseOver={() => {
				handleMouseOver(state);
			}}
		>
			<span className="state-name">{state}</span>
			<span className="active-cases">
				<b>Active: </b>
				{active}
			</span>
			<span className="deaths">
				<b>Deaths : </b>
				{death}
			</span>
		</div>
	);
};

export default StateList;
