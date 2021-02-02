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

const Statistics = ({ text, value }) => <p>{text} {value}</p>

const App = () => {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	const [all, setAll] = useState(0)
	const [average, setAverage] = useState(0)
	const [positive, setPositive] = useState(0)

	const goodButton = () => {
		setGood(good + 1)
		setAll(all + 1)

		setAverage((good - bad + 1) / (all + 1))
		setPositive((good + 1) / (all + 1))
	}
	const neutralButton = () => {
		setNeutral(neutral + 1)
		setAll(all + 1)

		setAverage((good - bad) / (all + 1))
		setPositive(good / (all + 1))
	}
	const badButton = () => {
		setBad(bad + 1)
		setAll(all + 1)

		setAverage((good - bad - 1) / (all + 1))
		setPositive(good / (all + 1))
	}

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
			<Statistics text="good" value={good} />
			<Statistics text="neutral" value={neutral} />
			<Statistics text="bad" value={bad} />

			<Statistics text="all" value={all} />
			<Statistics text="average" value={average} />
			<Statistics text="positive" value={positive * 100 + "%"} />
		</div>
  	</div>
	)
}

ReactDOM.render(<App />,
	document.getElementById('root')
)