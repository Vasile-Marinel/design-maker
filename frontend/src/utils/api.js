import axios from 'axios'
const local_api = 'http://localhost:5004'
const production_api = ''

const token = localStorage.getItem('user_token')

const api = axios.create({
    baseURL: local_api,
    headers: {
        'Authorization': token ? `Bearer ${token}` : ""
    },
    withCredentials: true
})

export default api;