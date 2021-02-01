import axios from 'axios'
// Old version.
// const baseUrl = 'http://localhost:3001/persons'
const baseUrl = 'http://localhost:3001/api/persons'

// get all
const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}
// create
const create = newObject => {
	const request = axios.post(baseUrl, newObject)
	return request.then(response => response.data)
}
// update
const update = (newObject) => {
	// Return whole response:
	// return axios.put(`${baseUrl}/${id}`, newObject)
	// Return only data:
	const request = axios.put(`${baseUrl}/${newObject.id}`, newObject)
	return request.then(response => response.data)
}
// delete
const remove = id => {
	const request = axios.delete(`${baseUrl}/${id}`)
	return request.then(response => response.data)
}

const exp = { getAll, create, update, remove }
export default exp