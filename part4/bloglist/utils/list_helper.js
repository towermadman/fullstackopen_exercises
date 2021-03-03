const dummy = () => {
	return 1
}

const totalLikes = (blogs) => {
	return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
	const mostLikes = Math.max(...blogs.map(blog => blog.likes))

	return blogs.find(blog => blog.likes === mostLikes)
}

const mostBlogs = (blogs) => {
	const authors = blogs.reduce((arr, blog) => (
		!arr.includes(blog.author)
		? arr.concat(blog.author)
		: arr
	), [])

	const authorBlogs = authors.map(author => {
		const blogCount = blogs.filter(blog => (
			blog.author === author
		)).length
		return {author, blogs: blogCount}
	})

	const maxBlogs = Math.max(...authorBlogs.map(author => author.blogs))
	
	return authorBlogs.find(author => author.blogs === maxBlogs)
}
const mostLikes = (blogs) => {
	const authors = blogs.reduce((arr, blog) => (
		!arr.includes(blog.author)
		? arr.concat(blog.author)
		: arr
	), [])

	const authorLikes = authors.map(author => {
		const likeCount = blogs
			.filter(blog => (
				blog.author === author
			))
			.reduce((totalLikes, blog) => (totalLikes + blog.likes), 0)

		return {author, likes: likeCount}
	})

	const maxLikes = Math.max(...authorLikes.map(author => author.likes))

	return authorLikes.find(author => author.likes === maxLikes)
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}