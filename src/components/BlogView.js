import React, { useState } from 'react';
import { addComment, deleteBlog, likeBlog } from '../reducers/blogsReducer';
import { useDispatch } from 'react-redux';
import { makeStyles, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			marginTop: theme.spacing(0.5),
			marginBottom: theme.spacing(0.5),
			width: '25ch',
		},
	},
	margin: {
		marginTop: theme.spacing(0.5),
		marginBottom: theme.spacing(0.5)
	}
}));

const BlogView = ({ blog, loggedIn }) => {
	const dispatch = useDispatch();
	const [comment, setComment] = useState('');

	const classes = useStyles();

	if (!blog) {
		return null;
	}

	const addLike = (blog, id) => {
		dispatch(likeBlog(blog, id));
	};

	const handleLike = () => {
		const data = {
			likes: blog.likes + 1,
			author: blog.author,
			title: blog.title,
			url: blog.url,
			user: blog.userId
		};
		addLike(data, blog.id);
	};

	const handleDelete = async () => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
			dispatch(deleteBlog(blog.id, loggedIn));
		}
	};

	const handleCommentSubmit = (e) => {
		e.preventDefault();
		dispatch(addComment(blog.id, comment));
		setComment('');
	}


	return (
		<div>
			<Typography variant='h4'>{blog.title}</Typography>
			{blog.url}<br/>
			added by {blog.author}<br/>
			{blog.likes} likes<br/>
			<Button variant='contained' size='small' onClick={handleLike} className={classes.margin}>like</Button>
			{loggedIn.id === blog.userId ? <button onClick={handleDelete}>delete</button> : null}
			<Typography variant='h5'>comments</Typography>
			<div>
				<form onSubmit={handleCommentSubmit} className={classes.root}>
					<TextField label='comment' value={comment} onChange={(e) => setComment(e.target.value)}/><br/>
					<Button type='submit' size='small' variant='contained' color='primary'>add comment</Button>
				</form>
			</div>
			<ul>
				{blog.comments.length ?
					blog.comments.map((comment, i) => <li key={comment+i}>{comment}</li>) :
					<p>no comments yet</p>
				}
			</ul>
		</div>
	)
}

export default BlogView;