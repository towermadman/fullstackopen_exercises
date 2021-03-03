const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
	const blogs = []

	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
})

describe('total likes', () => {
	const listWithOneBlog = [
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 5,
			__v: 0
		}
	]

	test('when list has only one blog, equals the likes of that', () => {
		const result = listHelper.totalLikes(listWithOneBlog)
		expect(result).toBe(5)
	})
})

describe('most likes', () => {
	const blogList = [
		{
			title: "Canonical string reduction",
			author: "Edsger W. Dijkstra",
			likes: 12
		},
		{
			title: "Magical string reduction",
			author: "Edsber M. Bijkstra",
			likes: 312
		}
	]

	test('when list has two blogs, equals Edsber with 312 likes', () => {
		const result = listHelper.favoriteBlog(blogList)
		expect(result).toEqual(blogList[1])
	})
})

describe('most blogs', () => {
	const blogList = [
		{
			title: "Magical string reduction",
			author: "Edsber M. Bijkstra",
			likes: 12
		},
		{
			title: "Amazing string reduction",
			author: "Robert C. Martin",
			likes: 9
		},
		{
			title: "Spaghetti string reduction",
			author: "Robert C. Martin",
			likes: 1
		},
	]

	test('out of list with 3 blogs, is Robert C. Martin with 2 blogs', () => {
		const result = listHelper.mostBlogs(blogList)
		expect(result).toEqual({
			author: "Robert C. Martin",
			blogs: 2
		})
	})
})

describe('most likes', () => {
	const blogList = [
		{
			title: "Magical string reduction",
			author: "Edsber M. Bijkstra",
			likes: 12
		},
		{
			title: "Amazing string reduction",
			author: "Robert C. Martin",
			likes: 9
		},
		{
			title: "Spaghetti string reduction",
			author: "Edsber M. Bijkstra",
			likes: 1
		},
	]

	test('out of list with 3 blogs, is Edsber M. Bijkstra with 13 likes', () => {
		const result = listHelper.mostLikes(blogList)
		expect(result).toEqual({
			author: 'Edsber M. Bijkstra',
			likes: 13
		})
	})
})