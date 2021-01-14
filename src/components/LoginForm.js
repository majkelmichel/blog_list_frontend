import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { loginUser } from '../reducers/userReducer';

const Login = () => {
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');

	const dispatch = useDispatch();

	const handleLogin = async (e) => {
		e.preventDefault();

		dispatch(loginUser(username, password));
		setUsername('');
		setPassword('');

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

export default Login;