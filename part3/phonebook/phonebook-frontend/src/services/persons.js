import axios from 'axios'

const url = 'http://localhost:3001/api/persons';

const getAll = () => {
    const response = axios.get(url)
    return response.then(response => response.data)
}

const create = (newPerson) => {
    const request = axios.post(url, newPerson)
    return request.then(response => {        
        return response.data
    })
}

const deletePerson = (id) => {
    const request = axios.delete(`${url}/${id}`)
    return request.then(response => response)
}

const updateNumber = (id, newPerson) => {
    const request = axios.put(`${url}/${id}`, newPerson)
    return request.then(response => response.data)
}


export default { getAll, create, deletePerson, updateNumber }