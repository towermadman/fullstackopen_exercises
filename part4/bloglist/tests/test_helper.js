const Blog = require('../models/blog')

const bcrypt = require('bcrypt')
const User = require('../models/user')

const initialBlogs = [
	{
		title: "Lame Blog Titles and You",
		author: "J.B. Networth",
		url: "www.String.com",
		likes: 5
	},
	{
		title: "Cool Blog Content and Me",
		author: "J.J. Wentworst",
		url: "www.String.com",
		likes: 2
	}
]

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

const loadBlogDb = async () => {
	await Blog.deleteMany({})

	const blogObjects = initialBlogs
		.map(blog => new Blog(blog))
	const promiseArray = blogObjects.map(blog => blog.save())
	await Promise.all(promiseArray)
}

const initialUsers = [
	{
		username: 'Test_Username',
		name: 'Test Name',
		password: 'Test_Password',
	}
]

const loadUserDb = async () => {
	await User.deleteMany({})

	let userObjects = initialUsers
	for (const user of userObjects) {
		user.passwordHash = await bcrypt.hash(user.password, 10)
	}

	const promiseArray = userObjects.map(user =>
		new User(user).save()
	)

	await Promise.all(promiseArray)
}

module.exports = {
	initialBlogs,
	blogsInDb,
	loadBlogDb,
	initialUsers,
	loadUserDb
}