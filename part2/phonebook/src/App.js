import { useState, useEffect } from 'react'
import personServices from './services/persons'
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
	const [ persons, setPersons ] = useState([])
	const [ newName, setNewName ] = useState('')
	const [ newNumber, setNewNumber ] = useState('')
	const [ searchFilter, setSearchFilter ] = useState('')
	const [ notification, setNotification ] = useState(null)

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

	const showNotification = (notification) => {
		setNotification(notification)
		setTimeout(() => {
			setNotification(null)
		}, 5000)
	}

	const updatePerson = (personObject, currentPerson) => {
		if (!window.confirm(
			`${newName} is already added to phonebook, replace the old number with a new one?`
		)) return

		personServices
			.update(personObject, currentPerson.id)
			.then(returnedPerson => {
				setPersons(persons.map(person =>
					person.id !== returnedPerson.id ? person : returnedPerson
				))
				setNewName('')
				setNewNumber('')

				showNotification({
					message: `Updated ${returnedPerson.name}`,
					success: true
				})
			})
			.catch(error => {
				showNotification({
					message: `Information of ${newName} has already been removed from server`,
					success: false
				})

				setPersons(persons.filter(person => person.id !== currentPerson.id))
			})
	}

	const createPerson = (personObject) => {
		personServices
			.create(personObject)
			.then(returnedPerson => {
				setPersons(persons.concat(returnedPerson))
				setNewName('')
				setNewNumber('')
				
				showNotification({
					message: `Added ${returnedPerson.name}`,
					success: true
				})
			})
			.catch(error => {
				console.log(error.response.data.error)
				showNotification({
					message: error.response.data.error,
					success: false
				})
			})
	}

	const addPerson = (event) => {
		event.preventDefault()

		const personObject = {
			name: newName,
			number: newNumber
		}

		const currentPerson = persons.find(person => person.name === newName)
		if (currentPerson) {
			updatePerson(personObject, currentPerson)
		} else {
			createPerson(personObject)
		}
	}

	const deletePerson = (id, name) => {
		if (!window.confirm(`Delete ${name}?`)) return

		personServices
			.remove(id)
			.then(() => setPersons(persons.filter(person => person.id !== id)))
			.catch(error => {
				showNotification({
					message: `Information of ${newName} has already been removed from server`,
					success: false
				})
			
				setPersons(persons.filter(person => person.id !== id))
			})
	}

	const filteredPersons = persons.filter(person =>
		person.name.toUpperCase().includes(searchFilter.toUpperCase())
	)

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification notification={notification} />
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
