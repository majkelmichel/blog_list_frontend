import React, { useState } from 'react';
import Info from './Info';
import PropTypes from 'prop-types';

const BlogForm = ({ addBlog }) => {
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
		addBlog(data);

		setInfo(`a new blog ${title} by ${author} has been added`);
		setTitle('');
		setAuthor('');
		setUrl('');
		setTimeout(() => {
			setInfo(null);
		}, 3000);
	};

	return (
		<>
			<h2>create new</h2>
			<Info message={info} color='green'/>
			<form onSubmit={handleSubmit}>
				title: <input type='text' value={title} onChange={({ target }) => setTitle(target.value)}/><br/>
				author: <input type='text' value={author} onChange={({ target }) => setAuthor(target.value)}/><br/>
				url: <input type='text' value={url} onChange={({ target }) => setUrl(target.value)}/><br/>
				<button type='submit'>create</button>
			</form>
		</>
	);
};

BlogForm.propTypes = {
	addBlog: PropTypes.func.isRequired,
};

export default BlogForm;