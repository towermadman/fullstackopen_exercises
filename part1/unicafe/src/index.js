import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ header }) => <h1>{header}</h1>

const Button = ({ onClick, text }) => {
	return (
		<button onClick={onClick}>
			{text}
		</button>
	)
}

const Feedback = ({ text, feedback }) => <p>{text} {feedback}</p>

const App = () => {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	const goodButton = () => setGood(good + 1)
	const neutralButton = () => setNeutral(neutral + 1)
	const badButton = () => setBad(bad + 1)

	return (
	<div>
		<Header header="give feedback" />
		<div>
			<Button onClick={goodButton} text="good"/>
			<Button onClick={neutralButton} text="neutral"/>
			<Button onClick={badButton} text="bad"/>
		</div>

		<Header header="statistics" />
		<div>
			<Feedback text="good" feedback={good} />
			<Feedback text="neutral" feedback={neutral} />
			<Feedback text="bad" feedback={bad} />
		</div>
  	</div>
	)
}

ReactDOM.render(<App />,
	document.getElementById('root')
)