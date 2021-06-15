const initialState = ''

const notificationReducer = (state = initialState, action) => {
	console.log('state now: ', state)
	console.log('action', action)

	switch (action.type) {
		case 'SET_MESSAGE':
			return action.message
		case 'CLEAR_MESSAGE':
			return ''
		default:
			return state
	}
}

let currentTimeoutId

export const setNotification = (message, time) => {
	clearTimeout(currentTimeoutId)

	return async (dispatch) => {
		await dispatch({
			type: 'SET_MESSAGE',
			message
		})
		currentTimeoutId = setTimeout(() => dispatch(clearNotification()), time * 1000)
	}
}

const clearNotification = () => {
	return {
		type: 'CLEAR_MESSAGE'
	}
}

export default notificationReducer