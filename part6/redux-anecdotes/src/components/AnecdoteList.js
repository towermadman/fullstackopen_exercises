import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increaseVotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
	return (
		<div>
			<div>
				{anecdote.content}
			</div>
			<div>
				has {anecdote.votes}
				<button onClick={handleClick}>vote</button>
			</div>
		</div>
	)
}

const AnecdoteList = () => {
	const anecdotes = useSelector(({ filter, anecdotes }) => {
		return (filter === null)
			? anecdotes
			: anecdotes.filter(a => a.content.includes(filter))
	})

	const dispatch = useDispatch()

	const vote = (anecdote) => {
		console.log('vote', anecdote.id)

		dispatch(increaseVotes(anecdote))

		dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
	}

	return (
		<div>
			{anecdotes
				.sort((anecdoteA, anecdoteB) => anecdoteB.votes - anecdoteA.votes)
				.map(anecdote =>
					<Anecdote
						key={anecdote.id}
						anecdote={anecdote}
						handleClick={() => vote(anecdote)}
					/>
				)}
		</div>
	)
}

export default AnecdoteList