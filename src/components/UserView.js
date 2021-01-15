import React from 'react';
import { List, Typography } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';

import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const UserView = ({ user }) => {
	if (!user) {
		return null;
	}

	return (
		<div>
			<Typography variant='h4'>{user.username}</Typography>
			<Typography variant='h5'>Added blogs:</Typography>
			<List>
				{user.blogs.map(blog =>
					<ListItem key={blog.id}>
						<ListItemIcon><ArrowRightIcon/></ListItemIcon>
						<ListItemText>{blog.title}</ListItemText>
					</ListItem>
				)}
			</List>
		</div>
	)
}

export default UserView;