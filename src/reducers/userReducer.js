import loginService from '../services/login';
import { setNotification } from './notificationReducer';

const initialState = null;

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'INIT_USER':
			return action.data;

		case 'LOGOUT':
			return null;

		case 'LOGIN':
			return action.data;

		default:
			return state;
	}

}

export const initUser = (loggedInUser) => {
	return dispatch => {
		dispatch({
			type: 'INIT_USER',
			data: loggedInUser
		});
	};
};

export const logoutUser = () => {
	return dispatch => {
		dispatch({
			type: 'LOGOUT'
		});
	};
};

export const loginUser = (username, password) => {
	return async dispatch => {
		try {
			const user = await loginService.login({
				username, password
			});
			window.localStorage.setItem('loggedInUser', JSON.stringify(user));
			dispatch({
				type: 'LOGIN',
				data: user
			});
		} catch (ex) {
			dispatch(setNotification('wrong credentials', 'red'));
		}

	};
};

export default userReducer;