import React from 'react';
import { logoutUser } from '../reducers/userReducer';
import { useDispatch } from 'react-redux';

const LoginStatus = ({ user }) => {
	const dispatch = useDispatch();

	const logout = () => {
		window.localStorage.clear();
		dispatch(logoutUser());
	};

	if (!user) {
		return null;
	}

	return (
		<p>
			{user.username} logged in
			<button onClick={logout}>logout</button>
		</p>
	);
};

export default LoginStatus;