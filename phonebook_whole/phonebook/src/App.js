import React, { useState, useEffect } from 'react'
//import axios from 'axios'
import Filter from './components/Filter'
import SubmitNumber from './components/SubmitNumber'
import Directory from './components/Directory'
import Notification from './components/Notification'
import Error from './components/Error'
import numberService from './services/numbers'


const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [showAll, SetShowAll] = useState(true)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  /*useEffect(() => {
	axios
		.get('http://localhost:3001/persons')
		.then(response => {
			console.log('Promise fulfilled')
			setPersons(response.data)
		})
}, [])*/
	useEffect(() => {
		numberService
		.getAll()
		.then(initialNumbers => {setPersons(initialNumbers)})
	}, [])

	const addPerson = (event) => {
		event.preventDefault()
		console.log(newName.toLowerCase())
		if (persons.find( ({ name }) => name === newName )){
			/*alert(`${newName} is already added to phonebook`)
			setNewName('')*/
			let r= window.confirm(`${newName} is already in the phonebook. Would you like to update the number for ${newName}?`);
			if (r === true) {
				console.log("User pressed OK.");
				const person = persons.find(p => p.name === newName)
				const changedPerson = { ...person, number: newNumber }
				numberService
				.update(changedPerson)
				.then(returnedPerson => {
					setPersons(persons.map(entry => entry.name !== newName ? entry :  returnedPerson))
					setNotificationMessage(
						`Updated ${returnedPerson.name}.`
					  )
					  setTimeout(() => {
						setNotificationMessage(null)
					  }, 5000)
					setNewName('')
					setNewNumber('')
				})
				.catch(error => {
					setErrorMessage(
						`'${person.name}' has already been removed from server`
					  )
					  setTimeout(() => {
						setErrorMessage(null)
					  }, 5000)
					setPersons(persons.filter(entry => entry.id !== person.id))
				  })
				/*.catch(error => {
					alert(
					`The entry '${person.name}' was already deleted from server`
					)
					setNotes(notes.filter(n => n.id !== id))
				})*/

			} else {
				console.log("User pressed cancel.");
			}
		}
		else {
		const personObject = {
			name: newName,
			number: newNumber,
			id: newName,
		}
		//setPersons(persons.concat(personObject))
		console.log('Add button clicked.', event.target);
		console.log('ID: ', personObject.id);
		numberService
		.create(personObject)
		.then(returnedPerson => {
			setPersons(persons.concat(returnedPerson))
			setNotificationMessage(
				`Added ${returnedPerson.name}.`
			  )
			  setTimeout(() => {
				setNotificationMessage(null)
			  }, 5000)
			setNewName('')
			setNewNumber('')
		})}
		/*axios
			.post('http://localhost:3001/persons', personObject)
			.then(response => {
				setPersons(persons.concat(response.data))
				setNewName('')
				setNewNumber('')
			})}*/
	}

	const handleNameChange = (event) => {
		console.log(event.target.value)
		setNewName(event.target.value)
	}

	const handleNumberChange = (event) => {
		console.log(event.target.value)
		setNewNumber(event.target.value)
	}

	const handleFilterChange = (event) => {
		console.log(event.target.value)
		setNewFilter(event.target.value)
		if (newFilter !== ''){
			SetShowAll(false)
		}
	}
	

	const personsToShow = showAll 
	? persons 
	: persons.filter(person => person.name.toLowerCase().indexOf(newFilter.toLowerCase()) !== -1)
	/*if (newFilter !== ''){
		  personsToShow  = filterPersons(persons, newFilter)
	}
	else {
		personsToShow = persons;
	}*/

	const removePerson = (person) => {
		console.log(`Delete button clicked for ${person.id}.`)
		let r= window.confirm(`Are you sure you want to delete ${person.name}?`);
		if (r === true) {
			console.log("User pressed OK.");
			numberService
			.remove(person.id)
			setPersons(persons.filter(entry => entry.id !== person.id))
			setNotificationMessage(
				`Removed ${person.name}.`
			  )
			  setTimeout(() => {
				setNotificationMessage(null)
			  }, 5000)
		} else {
			console.log("User pressed cancel.");
		}
		//numberService
		//.remove(person.id)
		/*.then(returnedPerson => {
			console.log(returnedPerson, typeof(returnedPerson))//setPersons(returnedPerson)
			setNewName('')
			setNewNumber('')
		})*/}

  return (
    <div>
      <h1>Phonebook</h1>
	  <Notification message={notificationMessage} />
	  <Error message={errorMessage} />
	  <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
	  <h2>Add new number</h2>
	  <SubmitNumber addPerson={addPerson} 
	  	newName={newName} 
	  	handleNameChange={handleNameChange}
	  	newNumber={newNumber}
	  	handleNumberChange={handleNumberChange}/>
      <Directory personsToShow={personsToShow} removePerson={removePerson}/>
    </div>
  )
}

export default App