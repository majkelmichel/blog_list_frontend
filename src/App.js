import React, { useState, useEffect } from 'react';

import Login from './components/LoginForm';

import blogService from './services/blogs';
import BlogList from './components/BlogList';

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

	return (
		<>
		{user === null ?
			<Login username={username} setUsername={setUsername} setUser={setUser} setPassword={setPassword} password={password} /> :
			<BlogList user={user} setBlogs={setBlogs} blogs={blogs} setUser={setUser} />
		}
		</>
	);
};

export default App;