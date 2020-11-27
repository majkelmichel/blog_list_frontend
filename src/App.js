import React, { useState, useEffect } from 'react';

import Blog from './components/Blog';
import Login from './components/LoginForm';

import blogService from './services/blogs';

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
	}

	return (
		<>
		{user === null ?
			<Login username={username} setUsername={setUsername} setUser={setUser} setPassword={setPassword} password={password} /> :
			<div>
				<h2>blogs</h2>
				<p>
					{user.username} logged in
					<button onClick={() => logout()}>logout</button>
				</p>
				{blogs.map(blog =>
					<Blog key={blog.id} blog={blog}/>,
				)}
			</div>
		}
		</>
	);
};

export default App;