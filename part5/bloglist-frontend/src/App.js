import React, { useState, useEffect, useRef } from 'react'

import Login from './components/Login'
import Blog from './components/Blog'
import Create from './components/Create'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [notification, setNotification] = useState(null)

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs(blogs)
		)
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
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

	const blogFormRef = useRef()

	const addBlog = (blogObject) => {
		blogFormRef.current.toggleVisibility()

		blogService
			.create(blogObject)
			.then(returnedBlog => {
				setBlogs(blogs.concat(returnedBlog))
				notifyWith(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
			})
			.catch(() => notifyWith('Failed to create blog', 'error'))
	}

	const updateBlog = async (id, blogObject) => {
		try {
			const returnedBlog = await blogService.update(id, blogObject)
			setBlogs(blogs.map(blog => blog.id === returnedBlog.id ? returnedBlog : blog))
		} catch (error) {
			notifyWith('ERROR', 'error')
			console.log(error)
		}
	}

	const deleteBlog = async (id) => {
		try {
			await blogService.remove(id)

			setBlogs(blogs.filter(blog => blog.id !== id))
			notifyWith('Blog deleted')
		} catch (error) {
			notifyWith('Failed to delete', 'error')
			console.log(error)
		}
	}

	const notifyWith = (message, type='success') => {
		setNotification({ message, type })
		setTimeout(() => {
			setNotification(null)
		}, 5000)
	}

	return (
		<div>
			<h1>Blogs</h1>

			<Notification notification={notification} />

			{user === null ?
				<Togglable buttonLabel='login'>
					<Login
						onSubmit={handleLogin}
						username={username}
						password={password}
						setUsername={setUsername}
						setPassword={setPassword}
					/>
				</Togglable> :
				<div>
					<p>{user.name} logged in</p>
					<form onSubmit={handleLogout}>
						<button type="submit">logout</button>
					</form>

					<Togglable buttonLabel='new blog' ref={blogFormRef}>
						<Create addBlog={addBlog} />
					</Togglable>

					{blogs
						.sort((blogA, blogB) => blogA.likes < blogB.likes)
						.map(blog =>
							<Blog
								key={blog.id}
								blog={blog}
								updateBlog={updateBlog}
								deleteBlog={deleteBlog}
								user={user}
							/>
						)}
				</div>
			}
		</div>
	)
}

export default App