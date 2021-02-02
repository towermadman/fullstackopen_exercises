import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ header }) => <h1>{header}</h1>

const Display = ({ anecdote, votes }) => {
	return(
		<div>
			<p>{anecdote}</p>
			<p>has {votes} votes</p>
		</div>
	)
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = (props) => {
	const [selected, setSelected] = useState(0)
	const [points, setPoints] = useState( new Array(props.anecdotes.length).fill(0) )
	const [top, setTop] = useState(0)

	const next = () => {
		const random = Math.round( Math.random() * (props.anecdotes.length - 1) )
		setSelected(random)
	}

	const vote = () => {
		const copy = [...points]
		copy[selected] += 1
		setPoints(copy)

		setTop(copy.indexOf( Math.max(...copy)) )
	}

	return (
		<div>
			<Header header="Anecdote of the day" />
			<Display anecdote={props.anecdotes[selected]} votes={points[selected]} />

			<Button onClick={vote} text="vote"/>
			<Button onClick={next} text="next anecdote"/>

			<Header header="Anecdote with most votes" />
			<Display anecdote={props.anecdotes[top]} votes={points[top]} />
		</div>
	)
}

const anecdotes = [
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
	<App anecdotes={anecdotes} />,
	document.getElementById('root')
)