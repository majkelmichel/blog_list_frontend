import React, { useRef } from 'react';
import Togglable from './Togglable';
import BlogForm from './BlogForm';
import BlogList from './BlogList';
import { createBlog } from '../reducers/blogsReducer';
import { useDispatch } from 'react-redux';

const Home = ({ user }) => {
	const dispatch = useDispatch();

	const blogFormRef = useRef();

	const addBlog = async (blog) => {
		blogFormRef.current.toggleVisibility();
		dispatch(createBlog(blog, user));
	};

	return (
		<div>
			<Togglable buttonLabel='new blog' ref={blogFormRef}>
				<BlogForm user={user} addBlog={addBlog}/>
			</Togglable>
			<BlogList user={user}/>
		</div>
	);
};

export default Home;