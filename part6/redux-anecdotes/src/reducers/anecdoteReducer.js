import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
	console.log('state now: ', state)
	console.log('action', action)

	switch (action.type) {
		case 'NEW_ANECDOTE':
			return [...state, action.data]
		case 'INIT_ANECDOTES':
			return action.data
		case 'VOTE': {
			const votedAnecdote = action.data

			return state.map(a =>
				a.id !== votedAnecdote.id ? a : votedAnecdote
			)
		}
		default:
			return state
	}
}

export const increaseVotes = (anecdote) => {
	return async (dispatch) => {
		const votedAnecdote = await anecdoteService.voteUp(anecdote)
		dispatch({
			type: 'VOTE',
			data: votedAnecdote
		})
	}
}

export const createAnecdote = (content) => {
	return async (dispatch) => {
		const newAnecdote = await anecdoteService.createNew(content)
		dispatch({
			type: 'NEW_ANECDOTE',
			data: newAnecdote
		})
	}
}

export const initializeAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdoteService.getAll()
		dispatch({
			type: 'INIT_ANECDOTES',
			data: anecdotes
		})
	}
}

export default anecdoteReducer