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

	return (
		<>
		{user === null ?
			<Login username={username} setUsername={setUsername} setUser={setUser} setPassword={setPassword} password={password} /> :
			<div>
				<h2>blogs</h2>
				<p>{user.username} logged in</p>
				{blogs.map(blog =>
					<Blog key={blog.id} blog={blog}/>,
				)}
			</div>
		}
		</>
	);
};

export default App;