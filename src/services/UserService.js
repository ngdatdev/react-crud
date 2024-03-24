import axios from './customize-axios'

const fetchAllUsers = (page) => {
    return axios.get(`api/users?page=${page}`)
}

const postCreateUser = (name, job) => {
    return axios.post('api/users', {name, job})
}

const putUpdateUser = (name, job) => {
    return axios.put('api/users/2', {name, job})
}

const deleteRemoveUser = (id) => {
    return axios.delete(`api/users/${id}`)
}

const postLoginUser = (email, password) => {
    return axios.post('api/register' , {email, password})
}
export {fetchAllUsers, postCreateUser, putUpdateUser, deleteRemoveUser, postLoginUser}