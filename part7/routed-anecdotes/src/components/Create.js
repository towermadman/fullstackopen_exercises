import React from 'react'
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks/index'

const Create = (props) => {
	const content = useField('text')
	const author = useField('text')
	const info = useField('text')

	const history = useHistory()

	const handleSubmit = (e) => {
		e.preventDefault()
		props.addNew({
			content: content.attrs.value,
			author: author.attrs.value,
			info: info.attrs.value,
			votes: 0
		})

		history.push('/')
	}

	const handleReset = (e) => {
		e.preventDefault()

		content.reset()
		author.reset()
		info.reset()
	}

	return (
		<div>
			<h2>Create a new anecdote</h2>

			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="form-content">Content</label>
					<input
						id="form-content"
						{...content.attrs}
					/>
				</div>

				<div>
					<label htmlFor="form-author">Author</label>
					<input
						id="form-author"
						{...author.attrs}
					/>
				</div>

				<div>
					<label htmlFor="form-info">Info URL</label>
					<input
						id="form-info"
						{...info.attrs}
					/>
				</div>

				<button>Create</button>
				<button onClick={handleReset}>Reset</button>
			</form>
		</div>
	)
}

export default Create