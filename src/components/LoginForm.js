import React from 'react';
import loginService from '../services/login';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';

const Login = ({ setUser, username, password, setUsername, setPassword }) => {
	const dispatch = useDispatch();

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const user = await loginService.login({
				username, password
			});
			setUser(user);
			window.localStorage.setItem('loggedInUser', JSON.stringify(user));
			setUsername('');
			setPassword('');
		} catch (ex) {
			dispatch(setNotification('wrong credentials', 'red'));
		}
	};

	return (
		<div id='login-form'>
			<h2>login</h2>
			<form onSubmit={handleLogin}>
				<div>
					username
					<input
						id='username'
						type='text'
						value={username}
						name="Username"
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password
					<input
						id='password'
						type='password'
						value={password}
						name='Password'
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button id='login-button' type='submit'>login</button>
			</form>
		</div>
	);
};

Login.propTypes = {
	setUser: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
	setUsername: PropTypes.func.isRequired,
	setPassword: PropTypes.func.isRequired
};

export default Login;