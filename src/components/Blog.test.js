import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
	let component;

	beforeEach(() => {
		const blog = {
			title: 'Test title',
			author: 'Test Author',
			likes: 0,
			url: 'http://testurl.test'
		};
		const mockHandler = jest.fn();
		component = render(
			<Blog id='test' addLike={mockHandler} loggedInId='12' removeBlog={mockHandler} userId='12' {...blog} />
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
});