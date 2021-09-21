import axios from 'axios'

const API_URL = 'http://localhost:4036/api/'

const API = axios.create({
    baseURL: API_URL
})

export default API