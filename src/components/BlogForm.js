import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';

const BlogForm = ({ addBlog }) => {
	const [ title, setTitle ] = useState('');
	const [ author, setAuthor ] = useState('');
	const [ url, setUrl ] = useState('');

	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = {
			title,
			author,
			url,
		};
		addBlog(data);

		dispatch(setNotification(`a new blog ${title} by ${author} has been added`, 'green'));
		setTitle('');
		setAuthor('');
		setUrl('');
	};

	return (
		<>
			<h2>create new</h2>
			<form id='blog-form' onSubmit={handleSubmit}>
				title: <input id='title' type='text' value={title} onChange={({ target }) => setTitle(target.value)}/><br/>
				author: <input id='author' type='text' value={author} onChange={({ target }) => setAuthor(target.value)}/><br/>
				url: <input id='url' type='text' value={url} onChange={({ target }) => setUrl(target.value)}/><br/>
				<button id='submitBlog' type='submit'>create</button>
			</form>
		</>
	);
};

BlogForm.propTypes = {
	addBlog: PropTypes.func.isRequired,
};

export default BlogForm;