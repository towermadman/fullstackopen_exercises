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

const Statistic = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = (props) => {
	if (props.all === 0) {
		return <div>No feedback given</div>
	}

	return (
		<table>
			<tbody>
				<Statistic text="good" value={props.good} />
				<Statistic text="neutral" value={props.neutral} />
				<Statistic text="bad" value={props.bad} />

				<Statistic text="all" value={props.all} />
				<Statistic text="average" value={props.average} />
				<Statistic text="positive" value={props.positive * 100 + "%"} />
			</tbody>
		</table>
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
		const newGood = good + 1
		setGood(newGood)
		
		const newAll = all + 1
		setAll(newAll)

		setAverage((newGood - bad) / newAll)
		setPositive(newGood / newAll)
	}
	const neutralButton = () => {
		const newNeutral = neutral + 1
		setNeutral(newNeutral)
		
		const newAll = all + 1
		setAll(newAll)

		setAverage((good - bad) / newAll)
		setPositive(good / newAll)
	}
	const badButton = () => {
		const newBad = bad + 1
		setBad(newBad)

		const newAll = all + 1
		setAll(newAll)

		setAverage((good - newBad) / newAll)
		setPositive(good / newAll)
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