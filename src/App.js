import React, { useState, useEffect, useRef } from 'react';

import Login from './components/LoginForm';

import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import './App.css';
import Notification from './components/Notification';
import BlogList from './components/BlogList';
import { createBlog, initializeBlogs } from './reducers/blogsReducer';
import { useDispatch } from 'react-redux';

const App = () => {
	// const [ blogs, setBlogs ] = useState([]);
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ user, setUser ] = useState(null);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initializeBlogs())
	}, [dispatch])

	useEffect(() => {
		const loggedIn = window.localStorage.getItem('loggedInUser');
		if (loggedIn) {
			setUser(JSON.parse(loggedIn));
		}
	}, []);

	const logout = () => {
		window.localStorage.clear();
		setUser(null);
	};

	const blogFormRef = useRef();

	const addBlog = async (blog) => {
		blogFormRef.current.toggleVisibility();
		dispatch(createBlog(blog, user));
	};

	return (
		<>
			<Notification/>
			{user === null ?
				<Login
					username={username}
					setUsername={setUsername}
					setUser={setUser}
					setPassword={setPassword}
					password={password}
				/> :
				<div>
					<h2>blogs</h2>
					<p>
						{user.username} logged in
						<button onClick={() => logout()}>logout</button>
					</p>
					<Togglable buttonLabel='new blog' ref={blogFormRef}>
						<BlogForm user={user} addBlog={addBlog}/>
					</Togglable>
					<BlogList user={user}/>
				</div>
			}
		</>
	);
};

export default App;