import axios from 'axios'

// const baseUrl = 'http://localhost:3001/persons'
// const baseUrl = 'http://localhost:3001/api/persons'
const baseUrl = '/api/persons'

const getAll = () => {
	return axios
		.get(baseUrl)
		.then(response => response.data)
}

const create = (person) => {
	return axios
		.post(baseUrl, person)
		.then(response => response.data)
}

const update = (person, id) => {
	return axios
		.put(`${baseUrl}/${id}`, person)
		.then(response => response.data)
}

const remove = (id) => {
	return axios
		.delete(`${baseUrl}/${id}`)
		.then(response => response.data)
}

export default { getAll, create, update, remove }