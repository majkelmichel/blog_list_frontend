import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import Button from '@material-ui/core/Button';
import DoneIcon from '@material-ui/icons/Done';
import { makeStyles, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			marginTop: theme.spacing(0.5),
			marginBottom: theme.spacing(0.5),
			width: '25ch',
		},
	},
}));

const BlogForm = ({ addBlog }) => {
	const [ title, setTitle ] = useState('');
	const [ author, setAuthor ] = useState('');
	const [ url, setUrl ] = useState('');

	const classes = useStyles();

	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = {
			title,
			author,
			url,
		};
		addBlog(data);

		dispatch(setNotification(`a new blog ${title} by ${author} has been added`, 'success'));
		setTitle('');
		setAuthor('');
		setUrl('');
	};

	return (
		<>
			<Typography variant='h4'>Create new blog</Typography>
			<form id='blog-form' onSubmit={handleSubmit} className={classes.root}>
				<TextField variant='outlined' size='small' label='Title' id='title' type='text' value={title} onChange={({ target }) => setTitle(target.value)}/><br/>
				<TextField variant='outlined' size='small' label='Author' id='author' type='text' value={author} onChange={({ target }) => setAuthor(target.value)}/><br/>
				<TextField variant='outlined' size='small' label='url' id='url' type='text' value={url} onChange={({ target }) => setUrl(target.value)}/><br/>
				<Button id='submitBlog' type='submit' variant='contained' size='small' color='primary' startIcon={<DoneIcon/>}>create</Button>
			</form>
		</>
	);
};

BlogForm.propTypes = {
	addBlog: PropTypes.func.isRequired,
};

export default BlogForm;