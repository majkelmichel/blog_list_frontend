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
		<span>
			{user.username} logged in
			<button onClick={logout}>logout</button>
		</span>
	);
};

export default LoginStatus;