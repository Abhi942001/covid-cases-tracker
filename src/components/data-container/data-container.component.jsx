import React, { useState, useEffect } from "react";

const DataContainer = ({ data, value }) => {
	const [covidData, updateCovidData] = useState(data);
	return (
		<option id={value} value={value}>
			{covidData.date}
		</option>
	);
};

export default DataContainer;
