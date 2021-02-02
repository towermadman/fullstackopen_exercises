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

const Statistic = ({ text, value }) => <p>{text} {value}</p>

const Statistics = (props) => {
	if (props.all === 0) {
		return <div>No feedback given</div>
	}

	return (
		<div>
			<Statistic text="good" value={props.good} />
			<Statistic text="neutral" value={props.neutral} />
			<Statistic text="bad" value={props.bad} />

			<Statistic text="all" value={props.all} />
			<Statistic text="average" value={props.average} />
			<Statistic text="positive" value={props.positive * 100 + "%"} />
		</div>
	)
}

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
			<Statistics
				good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}
			/>
		</div>
	)
}

ReactDOM.render(<App />,
	document.getElementById('root')
)