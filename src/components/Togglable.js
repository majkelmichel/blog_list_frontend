import React, { useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => (
	{
		root: {
			'& > *': {
				marginTop: theme.spacing(1),
				marginBottom: theme.spacing(1)
			}
		}
	}));

const Togglable = React.forwardRef((props, ref) => {
	const [ visible, setVisible ] = useState(false);

	const hide = { display: visible ? 'none' : '' };
	const show = { display: visible ? '' : 'none' };

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	useImperativeHandle(ref, () => {
		return {
			toggleVisibility
		};
	});

	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div style={hide}>
				<Button onClick={toggleVisibility} variant='contained' size='small' disableElevation
				        startIcon={<AddIcon/>}>{props.buttonLabel}</Button>
			</div>
			<div style={show}>
				{props.children}
				<Button onClick={toggleVisibility} variant='contained' size='small' color='secondary'
				        startIcon={<CancelIcon/>}>cancel</Button>
			</div>
		</div>
	);
});

Togglable.displayName = 'Togglable';

Togglable.propTypes = {
	children: PropTypes.object.isRequired,
	buttonLabel: PropTypes.string.isRequired
};

export default Togglable;