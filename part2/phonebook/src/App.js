import { useState, useEffect } from 'react'
import personServices from './services/persons'

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

const Person = ({ person, deletePerson }) => (
	<div>
		<p>{person.name} {person.number}
			<button type="button" onClick={() => deletePerson(person.id, person.name)}>delete</button>
		</p>
	</div>
)

const Persons = ({ persons, deletePerson }) => (
	persons.map(person =>
		<Person key={person.id} person={person} deletePerson={deletePerson} />
	)
)

const App = () => {
	const [ persons, setPersons ] = useState([])
	const [ newName, setNewName ] = useState('')
	const [ newNumber, setNewNumber ] = useState('')
	const [ searchFilter, setSearchFilter ] = useState('')

	useEffect(() => {
		personServices.getAll()
			.then(initialPersons => setPersons(initialPersons))
	}, [])

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

		const currentPerson = persons.find(person => person.name === newName)
		if (currentPerson) {
			if (!window.confirm(
				`${newName} is already added to phonebook, replace the old number with a new one?`
			)) return
			
			return personServices
				.update(personObject, currentPerson.id)
				.then(returnedPerson => {
					setPersons(persons.map(person =>
						person.id !== returnedPerson.id ? person : returnedPerson
					))
					setNewName('')
					setNewNumber('')
				})
		}

		personServices
			.create(personObject)
			.then(returnedPerson => {
				setPersons(persons.concat(returnedPerson))
				setNewName('')
				setNewNumber('')
			})
	}

	const deletePerson = (id, name) => {
		if (!window.confirm(`Delete ${name}?`)) return

		personServices
		.remove(id)
		.then(() => setPersons(persons.filter(person => person.id !== id)))
	}

	const filteredPersons = persons.filter(person =>
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
			<Persons persons={filteredPersons} deletePerson={deletePerson} />
		</div>
	)
}

export default App;
