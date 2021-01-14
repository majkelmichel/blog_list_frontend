import React from 'react';
import { Link } from 'react-router-dom';
import LoginStatus from './LoginStatus';
import { useSelector } from 'react-redux';

const Navigation = () => {
	const loggedInUser = useSelector(state => state.user);

	return (
		<div className='navbar'>
			<Link to={'/'}>home</Link> <Link to={'/users'}>users</Link> <LoginStatus user={loggedInUser}/>
		</div>
	);
};

export default Navigation;