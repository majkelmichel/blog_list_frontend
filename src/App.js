import React, { useState, useEffect, useRef } from 'react';

import Login from './components/LoginForm';

import blogService from './services/blogs';
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

	// useEffect(() => {
	// 	blogService.getAll().then(blogs =>
	// 		setBlogs(blogs)
	// 	);
	// }, []);

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
		const createdBlog = await blogService.createBlog(blog, user.token);
		console.log(createdBlog.data);
		dispatch(createBlog(createdBlog.data));
	};

	const dispatch = useDispatch();

	dispatch(initializeBlogs())

	// const addLike = async (blog, id) => {
	// 	await blogService.like(blog, id);
	// 	const index = blogs.findIndex(blog => blog.id === id);
	// 	let items = [ ...blogs ];
	// 	let item = { ...items[index] };
	// 	item.likes = blog.likes;
	// 	items[index] = item;
	// 	setBlogs(items);
	// };

	// const removeBlog = async (blogId) => {
	// 	await blogService.deleteBlog(blogId, user.token);
	// 	setBlogs(blogs.filter(blog => blog.id !== blogId));
	// };

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
					{/*<div id='blogs-container'>*/}
					{/*	{blogs.sort((prev, curr) => curr.likes - prev.likes).map(blog =>*/}
					{/*		<Blog*/}
					{/*			key={blog.id}*/}
					{/*			userId={blog.user.id || user.id}*/}
					{/*			addLike={addLike}*/}
					{/*			loggedInId={user.id}*/}
					{/*			removeBlog={removeBlog}*/}
					{/*			{...blog}*/}
					{/*		/>*/}
					{/*	)}*/}
					{/*</div>*/}
					<BlogList user={user}/>
				</div>
			}
		</>
	);
};

export default App;