import React, { useEffect, useState } from 'react';
import userService from '../services/users';
import { Link } from 'react-router-dom';
import { Paper, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

const Users = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {userService.getAll()
			.then(res => {
				setUsers(res.data);
			});
	}, []);

	return (
		<div>
			<Typography variant='h4'>Users</Typography>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Username</TableCell>
							<TableCell align='right'>Blogs created</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map(user =>
							<TableRow key={user.id}>
								<TableCell>
									<Link to={`/users/${user.id}`}>{user.username}</Link>
								</TableCell>
								<TableCell align='right'>{user.blogs.length || 0}</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	)
}

export default Users;