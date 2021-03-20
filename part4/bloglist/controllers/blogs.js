const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog
		.find({})
		.populate('user', { username: 1, name: 1 })

	response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
	const body = request.body
	const user = request.user

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes || 0,
		// likes: body.likes === undefined ? 0 : body.likes,
		user: user._id
	})

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
	const user = request.user

	const blog = await Blog.findById(request.params.id)

	if (user._id.toString() !== blog.user.toString()) {
		return response.status(401).json({ error: 'Unauthorized access' })
	}

	const deletedBlog = await Blog.deleteOne(blog)
	user.blogs = user.blogs.filter(b => b._id !== deletedBlog._id)

	response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
	const body = request.body
	const user = request.user

	const blog = await Blog.findById(request.params.id)

	if (user._id.toString() !== blog.user.toString()) {
		return response.status(401).json({ error: 'Unauthorized access' })
	}

	blog.title = body.title
	blog.author = body.author
	blog.url = body.url
	blog.likes = body.likes
	// blog.user = body.user

	const updatedBlog = await blog.save()

	user.blogs = user.blogs.map(b => b._id === updatedBlog._id ? updatedBlog : b)
	await user.save()

	response.status(201).json(updatedBlog)
})

module.exports = blogsRouter