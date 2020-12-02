import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = (props) => {
	const [ detailed, setDetailed ] = useState(false);

	const toggleDetails = () => {
		setDetailed(!detailed);
	};

	const showDetails = { display: detailed ? '' : 'none' };
	const label = detailed ? 'hide' : 'view';


	const handleLike = () => {
		const data = {
			likes: props.likes + 1,
			author: props.author,
			title: props.title,
			url: props.url,
			user: props.userId
		};
		props.addLike(data, props.id);
	};

	const handleDelete = async () => {
		if (window.confirm(`Remove blog ${props.title} by ${props.author}?`)) {
			props.removeBlog(props.id);
		}
	};

	return (
		<div className='Blog-border'>
			<div>
				{props.title} - {props.author}
				<button onClick={toggleDetails}>{label}</button>
			</div>
			<div className='details' style={showDetails}>
				{props.url}<br/>
				likes: <span className='likes'>{props.likes}</span>
				<button onClick={handleLike}>like</button>
				<br/>
				{props.loggedInId === props.userId ? <button onClick={handleDelete}>delete</button> : null}
			</div>
		</div>
	);
};

Blog.propTypes = {
	likes: PropTypes.number.isRequired,
	author: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	userId: PropTypes.string.isRequired,
	addLike: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired,
	loggedInId: PropTypes.string.isRequired,
	removeBlog: PropTypes.func.isRequired
};

export default Blog;