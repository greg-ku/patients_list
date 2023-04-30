import useSWR from 'swr'

const API_URL = 'http://localhost:3000'

const fetcher = (...args) => {
  return fetch(...args)
    .then(res => res.json())
    .then(
      (result) => result?.status === 'success'
        ? result.data
        : Promise.reject(result.error)
    )
}

export const usePaitents = () => {
  return useSWR(`${API_URL}/api/paitents`, fetcher)
}
