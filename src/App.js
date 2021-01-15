import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';

import { initializeBlogs } from './reducers/blogsReducer';
import { initUser } from './reducers/userReducer';

import Login from './components/LoginForm';
import Notification from './components/Notification';
import Home from './components/Home';

import userService from './services/users';

import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import Users from './components/Users';
import UserView from './components/UserView';
import BlogView from './components/BlogView';
import Navigation from './components/Navigation';
import { Container } from '@material-ui/core';

const App = () => {
	const [ users, setUsers ] = useState([]);

	const dispatch = useDispatch();

	const loggedIn = JSON.parse(window.localStorage.getItem('loggedInUser'));

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
	}, []);

	const loggedInUser = useSelector(state => state.user);

	const match = useRouteMatch('/users/:id');
	const user = match ?
		users.find(user => user.id === match.params.id) :
		null;

	const blogs = useSelector(state => state.blogs);

	const blogMatch = useRouteMatch('/blogs/:id');
	const blog = blogMatch ?
		blogs.find(blog => blog.id === blogMatch.params.id) :
		null;

	return (
		<>
			<Navigation/>
			<Container>
				<Notification/>
				<Switch>
					<Route path={'/blogs/:id'}>
						<BlogView blog={blog} loggedIn={loggedInUser}/>
					</Route>
					<Route path={'/users/:id'}>
						<UserView user={user}/>
					</Route>
					<Route path={'/users'}>
						{loggedIn ? <Users/> : <Redirect to={'/'}/>}
					</Route>
					<Route path={'/'}>
						{loggedInUser === null ?
							<Login/> :
							<Home user={loggedInUser}/>
						}
					</Route>
				</Switch>
			</Container>
		</>
	);
};

export default App;