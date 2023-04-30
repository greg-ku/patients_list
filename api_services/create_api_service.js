import express from 'express'
import bodyParser from 'body-parser'

const createApiService = () => {
  const server = express()
  server.use(bodyParser.json())

  const router = express.Router()
    .get('/paitents', getPaitents)
    .post('/paitents', createPaitent)

    .get('/orders', getOrders)
    .post('/orders', createOrder)
    .put('/orders/:orderId', updateOrderById)

  server.use('/api', router)

  return server
}

export default createApiService

const getPaitents = (req, res) => {
  res.send('getPaitents')
}

const createPaitent = (req, res) => {
  res.send('createPaitent')
}

const getOrders = (req, res) => {
  res.send('getOrders')
}

const createOrder = (req, res) => {
  res.send('createOrder')
}

const updateOrderById = (req, res) => {
  res.send('updateOrderById')
}
