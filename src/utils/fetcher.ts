import axios from 'axios'

const fetcher = (method: 'GET' | 'POST') => (url: string) =>
	method === 'GET'
		? axios.get(`${process.env.API_ROUTE_URI}${url}`)
		: axios.post(`${process.env.API_ROUTE_URI}${url}`)

export default fetcher
