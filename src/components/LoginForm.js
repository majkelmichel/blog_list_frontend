import React from 'react';
import loginService from '../services/login';

const Login = ({ setUser, username, password, setUsername, setPassword }) => {
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
			console.error('wrong credentials');
		}
	}

	return (
		<form onSubmit={handleLogin}>
			<div>
				username
				<input
					type='text'
					value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					type='password'
					value={password}
					name='Password'
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type='submit'>login</button>
		</form>
	)
}

export default Login;