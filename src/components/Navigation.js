import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
	AppBar,
	Button,
	IconButton,
	List,
	ListItem,
	ListItemText,
	makeStyles,
	Toolbar,
	Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Drawer from '@material-ui/core/Drawer';
import Paper from '@material-ui/core/Paper';
import GroupIcon from '@material-ui/icons/Group';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { logoutUser } from '../reducers/userReducer';

const useStyles = makeStyles((theme) => (
	{
		root: {
			flexGrow: 1
		},
		menuButton: {
			marginRight: theme.spacing(2)
		},
		title: {
			flexGrow: 1
		}
	}));

function ListItemLink(props) {
	const { icon, primary, to } = props;

	const renderLink = React.useMemo(
		() => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
		[ to ]
	);

	return (
		<li>
			<ListItem button component={renderLink}>
				{icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
				<ListItemText primary={primary}/>
			</ListItem>
		</li>
	);
}

const Navigation = () => {
	const classes = useStyles();

	const loggedInUser = useSelector(state => state.user);
	const [ state, setState ] = useState(false);

	const dispatch = useDispatch();

	const logout = () => {
		window.localStorage.clear();
		dispatch(logoutUser());
	};

	const toggleDrawer = (open) => (event) => {
		if (event.type === 'keydown' && (
			event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}

		setState(open);
	};

	const list = () => (
		<div role='presentation' onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
			<List>
				<Paper elevation={0}>
					<ListItemLink to='/' button key='Home' primary='Home' icon={<HomeIcon/>}/>
					<ListItemLink to='/users' button key='Users' primary='Users' icon={<GroupIcon/>}/>
				</Paper>
			</List>
		</div>
	);

	return (
		<AppBar position={'sticky'}>
			<Toolbar>
				{loggedInUser ?
					<React.Fragment key='left'>
						<IconButton edge='start' color='inherit' aria-label='menu' onClick={toggleDrawer(true)}
						            className={classes.menuButton}>
							<MenuIcon/>
						</IconButton>
						<Drawer anchor={'left'} open={state} onClose={toggleDrawer(false)}>
							{list()}
						</Drawer>
					</React.Fragment> :
					null
				}
				<Typography variant='h6' className={classes.title}>Blogs</Typography>
				{loggedInUser ?
					<>
						<Typography variant='button'>{loggedInUser.username} logged in</Typography>
						<Button color='inherit' endIcon={<ExitToAppIcon/>} onClick={logout}>Logout</Button>
					</>
					: null
				}
			</Toolbar>
		</AppBar>
	);
};

export default Navigation;