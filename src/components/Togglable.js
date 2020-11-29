import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Togglable = React.forwardRef((props, ref) => {
	const [ visible, setVisible ] = useState(false);

	const hide = { display: visible ? 'none' : '' };
	const show = { display: visible ? '' : 'none' };

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	useImperativeHandle(ref, () => {
		return {
			toggleVisibility,
		};
	});

	return (
		<div>
			<div style={hide}>
				<button onClick={toggleVisibility}>{props.buttonLabel}</button>
			</div>
			<div style={show}>
				{props.children}
				<button onClick={toggleVisibility}>cancel</button>
			</div>
		</div>
	);
});

Togglable.displayName = 'Togglable';

Togglable.propTypes = {
	children: PropTypes.object.isRequired,
	buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;