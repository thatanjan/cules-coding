import axios from './axios'

const fetcher = (url: string) => axios.get(url)

export default fetcher
