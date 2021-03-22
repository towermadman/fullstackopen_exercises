import React, { useState, useEffect } from 'react'

import Login from './components/Login'
import Blog from './components/Blog'
import Create from './components/Create'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')
	const [notification, setNotification] = useState(null)

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs(blogs)
		)
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username, password,
			})

			window.localStorage.setItem(
				'loggedBlogappUser', JSON.stringify(user)
			)
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
				notifyWith('wrong username or password', 'error')
				setTimeout(() => {
					setNotification(null)
				}, 5000)
			console.log(exception)
		}
	}

	const handleLogout = (event) => {
		event.preventDefault()

		window.localStorage.removeItem('loggedBlogappUser')
		setUser(null)
		blogService.setToken(null)
	}

	const addBlog = (event) => {
		event.preventDefault()
		const blogObject = {
			title: title,
			author: author,
			url: url,
		}

		blogService
			.create(blogObject)
			.then(returnedBlog => {
				setBlogs(blogs.concat(returnedBlog))
				setTitle('')
				setAuthor('')
				setUrl('')
				notifyWith(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
			})
			.catch(() => notifyWith('Failed to create blog', 'error'))
	}

	const notifyWith = (message, type='success') => {
		setNotification({ message, type })
		setTimeout(() => {
			setNotification(null)
		}, 5000)
	}

	return (
		<div>
			<Notification notification={notification} />

			{user === null ?
				<Login
					handleLogin={handleLogin}
					username={username} setUsername={setUsername}
					password={password} setPassword={setPassword}
				/> :
				<div>
					<h2>blogs</h2>

					<p>{user.name} logged in</p>
					<form onSubmit={handleLogout}>
						<button type="submit">logout</button>
					</form>

					<Create
						addBlog={addBlog}
						title={title} setTitle={setTitle}
						author={author} setAuthor={setAuthor}
						url={url} setUrl={setUrl}
					/>

					{blogs.map(blog =>
						<Blog key={blog.id} blog={blog} />
					)}
				</div>
			}
		</div>
	)
}

export default App