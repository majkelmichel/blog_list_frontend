import React from 'react';

const Info = ({ message, color }) => {

	if (message) {
		return (
			<div style={{
				border: `solid 5px ${color}`,
				color: color,
				borderRadius: '5px',
				padding: '10px',
				backgroundColor: 'lightgrey',
				fontSize: '1.5em',
				margin: '10px 0'
			}}>
				{message}
			</div>
		)
	}
	return null;
};

export default Info;