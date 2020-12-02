import React, { useState } from 'react';
import loginService from '../services/login';
import PropTypes from 'prop-types';

import Info from './Info';

const Login = ({ setUser, username, password, setUsername, setPassword }) => {

	const [ err, setErr ] = useState('');

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const user = await loginService.login({
				username, password,
			});
			setUser(user);
			window.localStorage.setItem('loggedInUser', JSON.stringify(user));
			setUsername('');
			setPassword('');
		} catch (ex) {
			setErr('wrong credentials');
			setTimeout(() => {
				setErr(null);
			}, 3000);
		}
	};

	return (
		<div id='login-form'>
			<h2>login</h2>
			<Info color='red' message={err}/>
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
	setPassword: PropTypes.func.isRequired,
};

export default Login;