import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Blog from './Blog';

test('renders component', () => {
	const blog = {
		title: 'Test title',
		author: 'Test Author',
		likes: 0,
		url: 'http://testurl.test'
	};

	const mockHandler = jest.fn();

	const component = render(
		<Blog id='test' addLike={mockHandler} loggedInId='12' removeBlog={mockHandler} userId='12' {...blog} />
	);

	expect(component.container).toHaveTextContent(
		'Test title'
	);
	expect(component.container).toHaveTextContent(
		'Test Author'
	);

	const detailed = component.container.querySelector('.details');
	expect(detailed).toHaveStyle('display: none;');
});