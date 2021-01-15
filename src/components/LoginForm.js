import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { loginUser } from '../reducers/userReducer';
import { makeStyles, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			marginTop: theme.spacing(0.5),
			marginBottom: theme.spacing(0.5),
			width: '25ch',
		},
	},
}));

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

	const classes = useStyles();

	return (
		<div id='login-form'>
			<Typography variant='h4'>Login</Typography>
			<form onSubmit={handleLogin} className={classes.root}>
				<TextField
					variant='outlined'
					size='small'
					label='username'
					value={username}
					onChange={({ target }) => setUsername(target.value)}
				/>
				<br/>
				<TextField
					variant='outlined'
					size='small'
					label='password'
					value={password}
					onChange={({ target }) => setPassword(target.value)}
				/>
				<br/>
				<Button variant='contained' id='login-button' type='submit'>login</Button>
			</form>
		</div>
	);
};

export default Login;