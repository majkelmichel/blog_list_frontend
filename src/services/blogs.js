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

export default { getAll, createBlog };