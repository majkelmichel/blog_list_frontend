import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
	const notification = useSelector(state => state.notification);


	if (notification === null) {
		return null;
	}
	console.log(notification);
	const color = notification.status;

	const style = {
		border: `solid 5px ${color}`,
		borderRadius: 5,
		padding: 10,
	};

	return (
		<div style={style}>
			{notification.content}
		</div>
	);
};

export default Notification;