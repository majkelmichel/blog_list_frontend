import React from 'react';

import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { Table, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';

const BlogList = () => {
	const blogs = useSelector(state => state.blogs);
	console.log(blogs);

	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Title</TableCell>
						<TableCell align='right'>Author</TableCell>
						<TableCell align='right'>Likes</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{blogs.length ?
						blogs.sort((prev, curr) => curr.likes - prev.likes).map(blog =>
							<TableRow key={blog.id}>
								<TableCell><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></TableCell>
								<TableCell align='right'>{blog.author}</TableCell>
								<TableCell align='right'>{blog.likes}</TableCell>
							</TableRow>
						):
						<TableRow>
							<TableCell align='center' colSpan={3}>
								<CircularProgress/>
							</TableCell>
						</TableRow>
					}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default BlogList;