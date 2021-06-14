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

export const setNotification = (message, time) => {
	return async (dispatch) => {
		await dispatch({
			type: 'SET_MESSAGE',
			message
		})
		setTimeout(() => dispatch(clearNotification()), time * 1000)
	}
}

const clearNotification = () => {
	return {
		type: 'CLEAR_MESSAGE'
	}
}

export default notificationReducer