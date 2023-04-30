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

export const useOrderById = (orderId) => {
  return useSWR(
    (orderId ? `${API_URL}/api/orders/${orderId}` : null),
    fetcher
  )
}

const responseHandler = (result) => {
  if (result?.status === 'success') {
    return [result.data]
  } else if (result?.status === 'error') {
    return [undefined, new Error(result.error)]
  }
  return [undefined, new Error('Unexpected Error')]
}

export const createOrder = (paitentId, Message) => {
  return fetch(
    `${API_URL}/api/paitents/${paitentId}/orders`,
    {
      body: JSON.stringify({ Message }),
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
    }
  ).then((response) => response.json())
  .then(responseHandler)
}

export const editOrder = (orderId, Message) => {
  return fetch(
    `${API_URL}/api/orders/${orderId}`,
    {
      body: JSON.stringify({ Message }),
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
    }
  ).then((response) => response.json())
  .then(responseHandler)
}
