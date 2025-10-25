import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5005' })

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token && config.headers) config.headers['Authorization'] = `Bearer ${token}`
  return config
})

export default API
