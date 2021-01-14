import blogService from '../services/blogs';

const initialState = [];

const blogsReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'INIT_BLOGS':
			return action.data;

		case 'NEW_BLOG':
			return [...state, action.data];

		default:
			return state;
	}
};

export const initializeBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll();
		dispatch({
			type: 'INIT_BLOGS',
			data: blogs
		});
	};
};

export const createBlog = (newBlog) => {
	return async dispatch => {
		dispatch({
			type: 'NEW_BLOG',
			data: newBlog
		});
	};
};

export default blogsReducer;