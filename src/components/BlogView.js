import React, { useState } from 'react';
import { addComment, deleteBlog, likeBlog } from '../reducers/blogsReducer';
import { useDispatch } from 'react-redux';

const BlogView = ({ blog, loggedIn }) => {
	const dispatch = useDispatch();
	const [comment, setComment] = useState('');

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
			<h2>{blog.title}</h2>
			{blog.url}<br/>
			{blog.likes} likes
			<button onClick={handleLike}>like</button>
			<br/>
			added by {blog.author}
			{loggedIn.id === blog.userId ? <button onClick={handleDelete}>delete</button> : null}
			<h3>comments</h3>
			<div>
				<form onSubmit={handleCommentSubmit}>
					<input value={comment} onChange={(e) => setComment(e.target.value)}/>
					<button type='submit'>add comment</button>
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