import React from 'react'
import Person from './Person'

const Directory = ({ personsToShow, removePerson }) =>{
	return (
		<><h2>Numbers</h2>
		<ul>
			{personsToShow.map(person => 
				<Person key={person.id}
				person={person}
				removePerson={removePerson}/>
			)}
		  </ul></>
	) }

export default Directory

