import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
	const blog = {
		title: 'Top 11 Ways To Make Job Interviews Awkward',
		author: 'Guy',
		url: 'www.url.biz',
		likes: 1000
	}

	const component = render(
		<Blog blog={blog} />
	)

	expect(component.container).toHaveTextContent(
		'Top 11 Ways To Make Job Interviews Awkward'
	)

	expect(component.container).toHaveTextContent(
		'Guy'
	)

	const url = component.container.querySelector('.url')
	expect(url).toBe(null)

	const likes = component.container.querySelector('.likes')
	expect(likes).toBe(null)
})

test('clicking the VIEW button reveals url and likes', () => {
	const blog = {
		title: 'Top 11 Ways To Make Job Interviews Awkward',
		author: 'Guy',
		url: 'www.url.biz',
		likes: 1000,
		user: { name: 'Guy', username: 'UserGuy' }
	}

	const component = render(
		<Blog
			blog={blog}
			user={{ username: 'UserGuy' }}
		/>
	)

	const button = component.getByText('view')
	fireEvent.click(button)

	const url = component.container.querySelector('.url')
	expect(url).toHaveTextContent('www.url.biz')

	const likes = component.container.querySelector('.likes')
	expect(likes).toHaveTextContent(1000)
})

test('clicking the LIKE button twice calls the event handler twice', () => {
	const blog = {
		title: 'Top 11 Ways To Make Job Interviews Awkward',
		author: 'Guy',
		url: 'www.url.biz',
		likes: 1000,
		user: { name: 'Guy', username: 'UserGuy' }
	}

	const mockHandler = jest.fn()

	const component = render(
		<Blog
			blog={blog}
			updateBlog={mockHandler}
			user={{ username: 'UserGuy' }}
		/>
	)

	const viewButton = component.getByText('view')
	fireEvent.click(viewButton)

	const likeButton = component.getByText('like')
	fireEvent.click(likeButton)
	fireEvent.click(likeButton)

	expect(mockHandler.mock.calls).toHaveLength(2)
})