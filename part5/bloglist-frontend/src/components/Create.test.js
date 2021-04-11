import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Create from './Create'

test('renders content', () => {
	const mockHandler = jest.fn()

	const component = render(
		<Create addBlog={mockHandler} />
	)

	const title = component.container.querySelector('input[name="Title"]')
	const author = component.container.querySelector('input[name="Author"]')
	const url = component.container.querySelector('input[name="Url"]')
	const form = component.container.querySelector('form')

	fireEvent.change(title, {
		target: { value: 'Top 11 Ways To Make Job Interviews Awkward' }
	})

	fireEvent.change(author, {
		target: { value: 'Guy' }
	})

	fireEvent.change(url, {
		target: { value: 'www.url.biz' }
	})

	fireEvent.submit(form)

	expect(mockHandler.mock.calls[0][0].title).toBe('Top 11 Ways To Make Job Interviews Awkward')
	expect(mockHandler.mock.calls[0][0].author).toBe('Guy')
	expect(mockHandler.mock.calls[0][0].url).toBe('www.url.biz')
})