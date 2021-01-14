import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Blog from './Blog';
import { deleteBlog, likeBlog } from '../reducers/blogsReducer';

const BlogList = ({ user }) => {
	const blogs = useSelector(state => state.blogs);
	const dispatch = useDispatch();

	if (blogs === null) {
		return null;
	}

	const addLike = async (blog, id) => {
		dispatch(likeBlog(blog, id));
	};

	const removeBlog = async (blogId) => {
		dispatch(deleteBlog(blogId, user));
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