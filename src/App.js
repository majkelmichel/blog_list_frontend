import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';

import { initializeBlogs } from './reducers/blogsReducer';
import { initUser } from './reducers/userReducer';

import Login from './components/LoginForm';
import Notification from './components/Notification';
import Home from './components/Home';

import userService from './services/users'

import {
	Switch,
	Route,
	Link,
	Redirect,
	useRouteMatch
} from 'react-router-dom';
import Users from './components/Users';
import LoginStatus from './components/LoginStatus';
import UserView from './components/UserView';

const App = () => {
	const [ users, setUsers] = useState([]);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initializeBlogs());
	}, [ dispatch ]);

	useEffect(() => {
		const loggedIn = window.localStorage.getItem('loggedInUser');
		if (loggedIn) {
			dispatch(initUser(JSON.parse(loggedIn)));
		}
	}, [ dispatch ]);

	useEffect(() => {
		userService.getAll()
			.then(res => {
				setUsers(res.data);
			});
	});

	const loggedInUser = useSelector(state => state.user);

	const match = useRouteMatch('/users/:id');
	const user = match ?
		users.find(user => user.id === match.params.id) :
		null;

	return (
		<>
			<Notification/>
			<h2>blogs</h2>
			<Link to={'/'}>home</Link> <Link to={'/users'}>users</Link>
			<LoginStatus user={loggedInUser}/>
			<Switch>
				<Route path={'/users/:id'}>
					<UserView user={user}/>
				</Route>
				<Route path={'/users'}>
					{loggedInUser ? <Users/> : <Redirect to={'/'}/>}
				</Route>
				<Route path={'/'}>
					{loggedInUser === null ?
						<Login/> :
						<Home user={loggedInUser}/>
					}
				</Route>
			</Switch>
		</>
	);
};

export default App;