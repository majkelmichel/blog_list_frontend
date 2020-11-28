import React from 'react';
import BlogForm from './BlogForm';
import Blog from './Blog';

const BlogList = ({ blogs, setBlogs, user, setUser }) => {
	const logout = () => {
		window.localStorage.clear();
		setUser(null);
	}

	return (
		<div>
			<h2>blogs</h2>
			<p>
				{user.username} logged in
				<button onClick={() => logout()}>logout</button>
			</p>
			<BlogForm user={user} blogs={blogs} setBlogs={setBlogs} />
			{blogs.map(blog =>
				<Blog key={blog.id} blog={blog}/>,
			)}
		</div>
	)
}

export default BlogList;