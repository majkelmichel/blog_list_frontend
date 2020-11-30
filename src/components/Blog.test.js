import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
	let component;
	const mockHandler = jest.fn();
	const likeHandler = jest.fn();

	beforeEach(() => {
		const blog = {
			title: 'Test title',
			author: 'Test Author',
			likes: 0,
			url: 'http://testurl.test'
		};

		component = render(
			<Blog id='test' addLike={likeHandler} loggedInId='12' removeBlog={mockHandler} userId='12' {...blog} />
		);
	});

	test('renders component', () => {

		expect(component.container).toHaveTextContent(
			'Test title'
		);
		expect(component.container).toHaveTextContent(
			'Test Author'
		);

		const detailed = component.container.querySelector('.details');
		expect(detailed).toHaveStyle('display: none;');
	});

	test('shows likes and link after clicking show button', () => {
		const button = component.getByText('view');
		fireEvent.click(button);

		expect(component.container).toHaveTextContent(
			'likes:'
		);

		expect(component.container).toHaveTextContent(
			'http://testurl.test'
		);

		const detailed = component.container.querySelector('.details');
		expect(detailed).not.toHaveStyle('display: none;');
	});

	test('when like button is clicked twice the handler for likes is called twice', () => {
		const likeButton = component.getByText('like');
		fireEvent.click(likeButton);
		fireEvent.click(likeButton);
		expect(likeHandler.mock.calls).toHaveLength(2);
	});
});