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
						<Blog key={blog.id} blog={blog}/>,
					)}
				</div>

			}
		</>
	);
};

export default App;