const Blog = require('../models/blog')

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

module.exports = {
	initialBlogs, blogsInDb
}