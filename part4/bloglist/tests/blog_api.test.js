const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
	await helper.loadBlogDb()
	await helper.loadUserDb()
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

describe('Addition of a new blog', () => {
	test('if logged in, a valid blog post can be added', async () => {
		const user = await api
			.post('/api/login')
			.send({
				username: helper.initialUsers[0].username,
				password: helper.initialUsers[0].password
			})
			.expect(200)

		const newBlog = {
			title: "Extremely Offensive Blog Titles and Why You're a Jerk",
			author: "J.J. Squidworth",
			url: "www.clickhereyoujerk.com",
			likes: 500
		}

		await api
			.post('/api/blogs')
			.set('Authorization', `bearer ${user.body.token}`)
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

	test('if no token provided, fails with status code 401 Unauthorized', async () => {
		const newBlog = {
			title: "Extremely Offensive Blog Titles and Why You're a Jerk",
			author: "J.J. Squidworth",
			url: "www.clickhereyoujerk.com",
			likes: 500
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(401)
	})
})

describe('addition of blog post with missing properties', () => {
	test('likes defaults to 0 and succeeds with status code 201', async () => {
		const user = await api
			.post('/api/login')
			.send({
				username: helper.initialUsers[0].username,
				password: helper.initialUsers[0].password
			})
			.expect(200)

		const newBlog = {
			title: "Extremely Offensive Blog Titles and Why You're a Jerk",
			author: "J.J. Squidworth",
			url: "www.clickhereyoujerk.com",
		}

		const response = await api
			.post('/api/blogs')
			.set('Authorization', `bearer ${user.body.token}`)
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		expect(response.body.likes).toBe(0)
	})

	test('title and url fails with status code 400', async () => {
		const user = await api
			.post('/api/login')
			.send({
				username: helper.initialUsers[0].username,
				password: helper.initialUsers[0].password
			})
			.expect(200)

		const newBlog = {
			author: "J.J. Squidworth",
			likes: 500
		}

		await api
			.post('/api/blogs')
			.set('Authorization', `bearer ${user.body.token}`)
			.send(newBlog)
			.expect(400)
	})
})

describe('addition of an invalid user', () => {
	test('fails with status code 400 when username length is 2', async () => {
		const invalidUser = {
			username: 'Jo',
			name: 'Joe',
			password: 'goodpassword'
		}

		const response = await api
			.post('/api/users/')
			.send(invalidUser)
			.expect(400)

		expect(response.body.error).toContain(
			'User validation failed'
		)
	})

	test('fails with status code 400 when password length is 2', async () => {
		const invalidUser = {
			username: 'Joe',
			name: 'Joe',
			password: 'pw'
		}

		const response = await api
			.post('/api/users/')
			.send(invalidUser)
			.expect(400)

		expect(response.body.error).toContain(
			'Password must be at least 3 characters'
		)
	})

	test('fails with status code 400 when username is taken', async () => {
		await helper.loadUserDb()

		const invalidUser = {
			username: helper.initialUsers[0].username,
			name: 'Joe',
			password: 'password'
		}

		const response = await api
			.post('/api/users')
			.send(invalidUser)
			.expect(400)

		expect(response.body.error).toContain(
			'User validation failed'
		)
	})
})

afterAll(() => {
	mongoose.connection.close()
})