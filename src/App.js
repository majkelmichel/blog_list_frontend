import React, { useState, useEffect, useRef } from 'react';

import Login from './components/LoginForm';

import blogService from './services/blogs';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import Blog from './components/Blog';

const App = () => {
	const [ blogs, setBlogs ] = useState([]);
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ user, setUser ] = useState(null);

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs(blogs),
		);
	}, []);

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

	const createBlog = async (blog) => {
		blogFormRef.current.toggleVisibility();
		const createdBlog = await blogService.createBlog(blog, user.token);
		setBlogs(blogs.concat(createdBlog.data));
	};

	const addLike = async (blog, id) => {
		await blogService.like(blog, id);
		const index = blogs.findIndex(blog => blog.id === id);
		let items = [...blogs];
		let item = {...items[index]}
		item.likes = blog.likes;
		items[index] = item;
		setBlogs(items);
	}

	return (
		<>
			{user === null ?
				<Login username={username} setUsername={setUsername} setUser={setUser} setPassword={setPassword}
				       password={password}/> :
				<div>
					<h2>blogs</h2>
					<p>
						{user.username} logged in
						<button onClick={() => logout()}>logout</button>
					</p>
					<Togglable buttonLabel='new blog' ref={blogFormRef}>
						<BlogForm user={user} blogs={blogs} setBlogs={setBlogs} addBlog={createBlog}/>
					</Togglable>
					{blogs.map(blog =>
						<Blog key={blog.id} title={blog.title} url={blog.url} author={blog.author} likes={blog.likes} id={blog.id} userId={blog.user.id} addLike={addLike}/>
					)}
				</div>

			}
		</>
	);
};

export default App;