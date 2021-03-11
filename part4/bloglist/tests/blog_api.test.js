const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
	await Blog.deleteMany({})

	for (let blog of helper.initialBlogs) {
		let blogObject = new Blog(blog)
		await blogObject.save()
	}
})

describe('when there is initially some blogs saved', () => {
	test('all blogs are returned as json', async () => {
		const response = await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)

		expect(response.body).toHaveLength(helper.initialBlogs.length)
	})

	test('unique identifier property is named id', async () => {
		const response = await api
			.get('/api/blogs')

		expect(response.body[0].id).toBeDefined()
	})
})

describe('addition of a new blog', () => {
	test('a valid blog post can be added', async () => {
		const newBlog = {
			title: "Extremely Offensive Blog Titles and Why You're a Jerk",
			author: "J.J. Squidworth",
			url: "www.clickhereyoujerk.com",
			likes: 500
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const dbBlogs = await helper.blogsInDb()
		expect(dbBlogs).toHaveLength(helper.initialBlogs.length + 1)

		const titles = dbBlogs.map(b => b.title)
		expect(titles).toContain(
			newBlog.title
		)
	})
})

describe('addition of blog post with missing properties', () => {
	test('likes defaults to 0 and succeeds with status code 201', async () => {
		const newBlog = {
			title: "Extremely Offensive Blog Titles and Why You're a Jerk",
			author: "J.J. Squidworth",
			url: "www.clickhereyoujerk.com",
		}

		const response = await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		expect(response.body.likes).toBe(0)
	})

	test('title and url fails with status code 400', async () => {
		const newBlog = {
			author: "J.J. Squidworth",
			likes: 500
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(400)
	})
})

describe('deletion of a blog', () => {
	test('succeeds with status code 204 if id is valid', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToDelete = blogsAtStart[0]

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.expect(204)

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd).toHaveLength(
			helper.initialBlogs.length - 1
		)

		const titles = blogsAtEnd.map(r => r.title)

		expect(titles).not.toContain(blogToDelete.title)
	})
})

describe('updating a blog', () => {
	test('suceeds with status code 200', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToUpdate = blogsAtStart[0]

		const updatedBlog = {
			title: "Extremely Offensive Blog Titles and Why You're a Jerk",
			author: "J.J. Squidworth",
			url: "www.clickhereyoujerk.com",
			likes: 500
		}

		await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(updatedBlog)
			.expect(200)

		const blogsAtEnd = await helper.blogsInDb()

		const titles = blogsAtEnd.map(b => b.title)
		expect(titles).toContain(
			updatedBlog.title
		)
	})
})

afterAll(() => {
	mongoose.connection.close()
})