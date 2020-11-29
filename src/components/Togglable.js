import React, { useState, useImperativeHandle } from 'react';

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

export default Togglable;