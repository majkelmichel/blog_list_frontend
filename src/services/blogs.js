import axios from 'axios';

const baseUrl = '/api/blogs';

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then(response => response.data);
};

const createBlog = async (data, token) => {
	const config = {
		headers: {
			authorization: token,
		},
	};
	return await axios.post(baseUrl, data, config);
};

const like = async (blog, id) => {
	return axios.put(`${baseUrl}/${id}`, blog);
};

const deleteBlog = async (id, token) => {
	const config = {
		headers: {
			authorization: token,
		},
	};
	return axios.delete(`${baseUrl}/${id}`, config);
};

export default { getAll, createBlog, like, deleteBlog };