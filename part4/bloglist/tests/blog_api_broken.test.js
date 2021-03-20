const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
	await helper.loadBlogDb()
	await helper.loadUserDb()
})

// Broken, no user ID attached to blogs
describe('if logged in, deletion of a blog', () => {
	test('succeeds with status code 204 if id is valid', async () => {
		const user = await api
			.post('/api/login')
			.send({
				username: helper.initialUsers[0].username,
				password: helper.initialUsers[0].password
			})
			.expect(200)

		const blogsAtStart = await helper.blogsInDb()
		const blogToDelete = blogsAtStart[0]

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.set('Authorization', `bearer ${user.body.token}`)
			.expect(204)

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd).toHaveLength(
			helper.initialBlogs.length - 1
		)

		const titles = blogsAtEnd.map(r => r.title)

		expect(titles).not.toContain(blogToDelete.title)
	})
})

// Broken
describe('if logged in, updating a blog', () => {
	test('suceeds with status code 200', async () => {
		const user = await api
			.post('/api/login')
			.send({
				username: helper.initialUsers[0].username,
				password: helper.initialUsers[0].password
			})
			.expect(200)

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
			.set('Authorization', `bearer ${user.body.token}`)
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