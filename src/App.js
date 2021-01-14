import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';

import { initializeBlogs } from './reducers/blogsReducer';
import { initUser } from './reducers/userReducer';

import Login from './components/LoginForm';
import Notification from './components/Notification';
import Home from './components/Home';

import {
	Switch,
	Route,
	Link,
	Redirect
} from 'react-router-dom';
import Users from './components/Users';
import LoginStatus from './components/LoginStatus';

const App = () => {
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

	const user = useSelector(state => state.user);

	return (
		<>
			<Notification/>
			<h2>blogs</h2>
			<Link to={'/'}>home</Link> <Link to={'/users'}>users</Link>
			<LoginStatus user={user}/>
			<Switch>
				<Route path={'/users'}>
					{user ? <Users/> : <Redirect to={'/'}/>}
				</Route>
				<Route path={'/'}>
					{user === null ?
						<Login/> :
						<Home user={user}/>
					}
				</Route>
			</Switch>
		</>
	);
};

export default App;