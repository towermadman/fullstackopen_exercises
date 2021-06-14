const initialState = {
	good: 0,
	ok: 0,
	bad: 0
}

const counterReducer = (state = initialState, action) => {
	console.log(action)
	switch (action.type) {
		case 'GOOD':
			return { ...state, good: action.data.good }
		case 'OK':
			return { ...state, ok: action.data.ok }
		case 'BAD':
			return { ...state, bad: action.data.bad }
		case 'ZERO':
			return initialState
		default:
			return state
	}

}

export default counterReducer