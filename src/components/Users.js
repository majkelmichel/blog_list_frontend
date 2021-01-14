import React, { useEffect, useState } from 'react';
import userService from '../services/users';
import { Link } from 'react-router-dom';

const Users = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {userService.getAll()
			.then(res => {
				setUsers(res.data);
			});
	}, []);

	return (
		<div>
			<h2>Users</h2>
			<table>
				<tbody>
					<tr>
						<td/>
						<td><strong>blogs created</strong></td>
					</tr>
					{users.map(user =>
						<tr key={user.id}>
							<td>
								<Link to={`/users/${user.id}`}>{user.username}</Link>
							</td>
							<td>{user.blogs.length || 0}</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}

export default Users;