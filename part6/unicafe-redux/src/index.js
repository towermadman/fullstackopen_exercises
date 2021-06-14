import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
	const good = () => {
		store.dispatch({
			type: 'GOOD',
			data: {
				good: store.getState().good + 1
			}
		})
	}
	const ok = () => {
		store.dispatch({
			type: 'OK',
			data: {
				ok: store.getState().ok + 1
			}
		})
	}
	const bad = () => {
		store.dispatch({
			type: 'BAD',
			data: {
				bad: store.getState().bad + 1
			}
		})
	}
	const reset = () => {
		store.dispatch({
			type: 'ZERO'
		})
	}

	return (
		<div>
			<button onClick={good}>good</button>
			<button onClick={ok}>neutral</button>
			<button onClick={bad}>bad</button>
			<button onClick={reset}>reset stats</button>
			<div>good {store.getState().good}</div>
			<div>neutral {store.getState().ok}</div>
			<div>bad {store.getState().bad}</div>
		</div>
	)
}

const renderApp = () => {
	ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)