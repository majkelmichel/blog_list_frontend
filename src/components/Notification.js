import React from 'react';
import { useSelector } from 'react-redux';
import MuiAlert from '@material-ui/lab/Alert';

const Notification = ({}) => {
	const notification = useSelector(state => state.notification);


	if (notification === null) {
		return null;
	}

	return (
		<MuiAlert severity={notification.status} elevation={6} variant='filled'>
			{notification.content}
		</MuiAlert>
	);
};

export default Notification;