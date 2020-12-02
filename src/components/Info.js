import React from 'react';
import PropTypes from 'prop-types';

const Info = ({ message, color }) => {

	if (message) {
		return (
			<div className='error' style={{
				border: `solid 5px ${color}`,
				color: color
			}}>
				{message}
			</div>
		);
	}
	return null;
};

Info.propTypes = {
	message: PropTypes.string,
	color: PropTypes.string.isRequired,
};

export default Info;