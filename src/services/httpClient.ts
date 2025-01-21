import axios from 'axios'

const httpClient = axios.create({
  baseURL: 'http://localhost:5215/api',
  timeout: 5000,
  headers: {
    'X-API-KEY': import.meta.env.VITE_API_KEY,
  },
})

export default httpClient
