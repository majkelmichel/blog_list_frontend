import React from 'react';
import { deleteBlog, likeBlog } from '../reducers/blogsReducer';
import { useDispatch } from 'react-redux';

const BlogView = ({ blog, loggedIn }) => {
	const dispatch = useDispatch();

	if (!blog) {
		return null;
	}

	const addLike = async (blog, id) => {
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

	return (
		<div>
			<h2>{blog.title}</h2>
			{blog.url}<br/>
			{blog.likes} likes
			<button onClick={handleLike}>like</button>
			<br/>
			added by {blog.author}
			{loggedIn.id === blog.userId ? <button onClick={handleDelete}>delete</button> : null}
		</div>
	)
}

export default BlogView;