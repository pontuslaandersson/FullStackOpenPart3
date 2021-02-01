import React from 'react'

/*const removeNumber = (id) => {
	console.log('Delete button clicked.')
	numberService

}*/

const Person = ({ person, removePerson }) =>{
	return (
		<><li>
			{person.name} {person.number} <button onClick={() => removePerson(person)}>delete</button>
		</li>
		</>
	) }

export default Person