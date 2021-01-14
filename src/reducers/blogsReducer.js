import blogService from '../services/blogs';

const initialState = [];

const blogsReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'INIT_BLOGS':
			return action.data;

		case 'NEW_BLOG':
			return [...state, action.data];

		case 'LIKE_BLOG':
			const index = state.findIndex(blog => blog.id === action.data.id);
			let items = [ ...state ];
			let item = { ...items[index] };
			item.likes = action.data.blog.likes;
			items[index] = item;
			return items;

		case 'DELETE_BLOG':
			return state.filter(blog => blog.id !== action.data);

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

export const createBlog = (blog, user) => {
	return async dispatch => {
		const createdBlog = await blogService.createBlog(blog, user.token);
		dispatch({
			type: 'NEW_BLOG',
			data: createdBlog.data
		});
	};
};

export const likeBlog = (blog, id) => {
	return async dispatch => {
		await blogService.like(blog, id);
		dispatch({
			type: 'LIKE_BLOG',
			data: {
				blog,
				id
			}
		});
	};
};

export const deleteBlog = (blogId, user) => {
	return async dispatch => {
		await blogService.deleteBlog(blogId, user.token);
		dispatch({
			type: 'DELETE_BLOG',
			data: blogId
		})
	}
}

export default blogsReducer;