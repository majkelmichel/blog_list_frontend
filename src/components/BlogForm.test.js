import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';

describe('<BlogForm />', () => {
	let component;
	const addHandler = jest.fn();
	const blog = {
		title: 'Test title',
		author: 'Test Author',
		url: 'http://testurl.test'
	};

	beforeEach(() => {
		component = render(
			<BlogForm addBlog={addHandler}/>
		);
	});

	test('author input field has right data when the data is added', () => {
		const author = component.container.querySelector('#author');
		fireEvent.change(author, {
			target: { value: blog.author }
		});

		expect(author).toHaveValue(
			'Test Author'
		);
	});

	test('right data is send to parent component when blog is submitted', () => {
		const form = component.container.querySelector('form');

		const author = component.container.querySelector('#author');
		fireEvent.change(author, {
			target: { value: blog.author }
		});
		const title = component.container.querySelector('#title');
		fireEvent.change(title, {
			target: { value: blog.title }
		});
		const url = component.container.querySelector('#url');
		fireEvent.change(url, {
			target: { value: blog.url }
		});

		fireEvent.submit(form);

		expect(addHandler.mock.calls).toHaveLength(1);
		expect(addHandler.mock.calls[0][0]).toEqual({
			title: 'Test title',
			author: 'Test Author',
			url: 'http://testurl.test'
		});
	});
});