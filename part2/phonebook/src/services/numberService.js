import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const create = newObject => {
	const request = axios.post(baseUrl, newObject)
	return request.then(response => response.data)
}

const deletePerson = id => {
	const urlToDelete = `${baseUrl}/${id}`

	getAll()
		.then(people => {
			const personToDelete = people.find(person => person.id === id)
			
			if (confirm(`Delete ${personToDelete.name}?`)) {
				return axios.delete(urlToDelete)
			}
		})
		.catch(error => {
			alert(
				'The person was already deleted from the server'
			)
		})
}

export default { 
	getAll, create, deletePerson 
}