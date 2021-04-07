import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
	const [visible, setVisible] = useState(false)

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const addLike = (event) => {
		event.preventDefault()

		const blogObject = {
			user: blog.user,
			title: blog.title,
			author: blog.author,
			url: blog.url,
			likes: blog.likes + 1
		}

		updateBlog(blog.id, blogObject)
	}

	const removeBlog = (blog) => {
		if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) return

		deleteBlog(blog.id)
	}

	return (
		<div style={blogStyle}>
			{blog.title} {blog.author}
			{visible ?
				<>
					<button onClick={toggleVisibility}>hide</button>
					<div>
						<div>{blog.url}</div>
						<div>
							likes {blog.likes}
							<button onClick={addLike}>like</button>
						</div>
						<div>{blog.user.name}</div>
						{user.username === blog.user.username ?
							<button onClick={() => removeBlog(blog)}>remove</button> :
							null
						}
					</div>
				</> :
				<button onClick={toggleVisibility}>view</button>
			}
		</div>
	)
}

export default Blog