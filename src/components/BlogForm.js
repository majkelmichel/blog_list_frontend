import React, { useState } from 'react';
import blogService from '../services/blogs';
import Info from './Info';

const BlogForm = ({ user, blogs, setBlogs }) => {
	const [ title, setTitle ] = useState('');
	const [ author, setAuthor ] = useState('');
	const [ url, setUrl ] = useState('');
	const [ info, setInfo ] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = {
			title,
			author,
			url,
		};
		const createdBlog = await blogService.createBlog(data, user.token);
		setBlogs(blogs.concat(createdBlog.data));
		setInfo(`a new blog ${title} by ${author} has been added`)
		setTitle('');
		setAuthor('');
		setUrl('');
		setTimeout(() => {
			setInfo(null)
		}, 3000);
	}

	return (
		<>
			<h2>create new</h2>
			<Info message={info} color='green' />
			<form onSubmit={handleSubmit}>
				title: <input type='text' value={title} onChange={({ target }) => setTitle(target.value)}/><br/>
				author: <input type='text' value={author} onChange={({ target }) => setAuthor(target.value)}/><br/>
				url: <input type='text' value={url} onChange={({ target }) => setUrl(target.value)}/><br/>
				<button type='submit'>create</button>
			</form>
		</>
	)
}

export default BlogForm;