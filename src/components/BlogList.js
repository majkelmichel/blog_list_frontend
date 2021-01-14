import React from 'react';

import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

const BlogList = () => {
	const blogs = useSelector(state => state.blogs);

	if (blogs === null) {
		return null;
	}

	return (
		<div id='blogs-container'>
			{blogs.sort((prev, curr) => curr.likes - prev.likes).map(blog =>
				<div className='Blog-border' key={blog.id}>
					<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
				</div>
			)}
		</div>
	);
};

export default BlogList;