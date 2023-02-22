import axios from 'axios'

const pocketApi = axios.create({
  baseURL: '/api'
})

export default pocketApi
