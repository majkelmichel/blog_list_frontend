import React from 'react';

import { useSelector } from 'react-redux';
import Blog from './Blog';
import blogService from '../services/blogs';

const BlogList = ({ user }) => {
	const blogs = useSelector(state => state.blogs);

	console.log(blogs);

	if (blogs === null) {
		return null;
	}

	const addLike = async (blog, id) => {
		await blogService.like(blog, id);
		const index = blogs.findIndex(blog => blog.id === id);
		let items = [ ...blogs ];
		let item = { ...items[index] };
		item.likes = blog.likes;
		items[index] = item;
		// setBlogs(items);
	};

	const removeBlog = async (blogId) => {
		await blogService.deleteBlog(blogId, user.token);
		// setBlogs(blogs.filter(blog => blog.id !== blogId));
	};

	return (
		<div id='blogs-container'>
			{blogs.sort((prev, curr) => curr.likes - prev.likes).map(blog =>
				<Blog
					key={blog.id}
					userId={blog.user.id || user.id}
					addLike={addLike}
					loggedInId={user.id}
					removeBlog={removeBlog}
					{...blog}
				/>
			)}
		</div>
	)
}

export default BlogList;