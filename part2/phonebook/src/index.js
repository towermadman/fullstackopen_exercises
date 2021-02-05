import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const Filter = ({ value, onChange }) => (
	<div>
		filter shown with <input
		value={value}
		onChange={onChange} />
	</div>
)

const PersonForm = (props) => (
	<form onSubmit={props.addPerson}>
		<div>
			name: <input
			value={props.newName}
			onChange={props.handleNameChange} />
		</div>
		<div>
			number: <input
			value={props.newNumber}
			onChange={props.handleNumberChange} />
		</div>
		<div>
			<button type="submit">add</button>
		</div>
	</form>
)

const Person = ({ person }) => <p>{person.name} {person.number}</p>

const Persons = ({ numbers }) => (
	numbers.map(person =>
		<Person key={person.name} person={person} />
	)
)

const App = () => {
	const [ persons, setPersons ] = useState([])
	const [ newName, setNewName ] = useState('')
	const [ newNumber, setNewNumber ] = useState('')
	const [ searchFilter, setSearchFilter ] = useState('')

	const hook = () => {
		axios
			.get('http://localhost:3001/persons')
			.then(response => setPersons(response.data))
	}
	useEffect(hook, [])

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}
	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}
	const handleFilterChange = (event) => {
		setSearchFilter(event.target.value)
	}

	const addPerson = (event) => {
		event.preventDefault()
		const personObject = {
			name: newName,
			number: newNumber
		}

		if (persons.find(person =>
			person.name === newName
		)) return alert(`${newName} is already added to phonebook`)

		setPersons(persons.concat(personObject))
		setNewName('')
		setNewNumber('')
	}

	const numbers = persons.filter(person =>
		person.name.toUpperCase().includes(searchFilter.toUpperCase())
	)

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter value={searchFilter} onChange={handleFilterChange} />

			<h2>add a new</h2>
			<PersonForm
				addPerson={addPerson}
				newName={newName}
				newNumber={newNumber}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
			/>

			<h2>Numbers</h2>
			<Persons numbers={numbers} />
		</div>
	)
}

export default App

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);