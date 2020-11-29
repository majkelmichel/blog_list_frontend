import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = (props) => {
	const [ detailed, setDetailed ] = useState(false);

	const toggleDetails = () => {
		setDetailed(!detailed);
	};

	const showDetails = { display: detailed ? '' : 'none' };
	const label = detailed ? 'hide' : 'view';

	const style = {
		border: 'solid 2px black',
		padding: '10px',
		margin: '5px',
	};

	const handleLike = () => {
		const data = {
			likes: props.likes + 1,
			author: props.author,
			title: props.title,
			url: props.url,
			user: props.userId,
		};
		props.addLike(data, props.id);
	};

	const handleDelete = async () => {
		if (window.confirm(`Remove blog ${props.title} by ${props.author}?`)) {
			props.removeBlog(props.id);
		}
	};

	return (
		<div style={style}>
			<div>
				{props.title}
				<button onClick={toggleDetails}>{label}</button>
			</div>
			<div style={showDetails}>
				{props.url}<br/>
				likes: {props.likes}
				<button onClick={handleLike}>like</button>
				<br/>
				{props.author}<br/>
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
	addLike: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	loggedInId: PropTypes.string.isRequired,
	removeBlog: PropTypes.func.isRequired,
};

export default Blog;