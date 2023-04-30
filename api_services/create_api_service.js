import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

const { Schema } = mongoose

const createApiService = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/test_patients')
  // await mongoose.connect('mongodb://192.168.50.189:27017/test_patients')

  const server = express()
  server.use(bodyParser.json())

  const router = express.Router()
    .get('/paitents', getPaitents)
    .post('/paitents', createPaitent)

    .get('/orders', getOrders)
    .post('/paitents/:paitentId/orders', createOrderByPaitent)
    .put('/orders/:orderId', updateOrderById)
    .get('/orders/:orderId', getOrderById)

  server.use('/api', router)

  return server
}

export default createApiService

mongoose.connection.on('error', (err) => {
  console.error(`mongo error: ${err.message}`)
})

const PaitentSchema = new Schema({
  Name: { type: String, required: true },
  OrderId: { type: 'ObjectId', ref: 'Order' },
},
{
  virtuals: {
    Id: {
      get() { return this._id.toHexString() }
    }
  }
})
PaitentSchema.set('toJSON', { virtuals: true })
const Paitent = mongoose.model('Paitent', PaitentSchema)

const getPaitents = async (req, res) => {
  const paitents = await Paitent.find()
  res.json({
    status: 'success',
    data: paitents,
  })
}

const createPaitent = async (req, res) => {
  if (!req.body.Name) {
    res.json({
      status: 'error',
      message: 'Name field is required',
    })
    return
  }
  const paitent = {
    Name: req.body.Name,
    OrderId: req.body.OrderId || null
  }
  const newPaitent = await Paitent.create(paitent)
  res.json({
    status: 'success',
    data: newPaitent
  })
}

const OrderSchema = new Schema({
  Message: { type: String, required: true },
},
{
  virtuals: {
    Id: {
      set() { return this._id.toHexString() }
    }
  }
})
OrderSchema.set('toJSON', { virtuals: true })
const Order = mongoose.model('Order', OrderSchema)

const getOrders = async (req, res) => {
  const orders = await Order.find()
  res.json({
    status: 'success',
    data: orders,
  })
}

const createOrderByPaitent = async (req, res) => {
  if (!req.body.Message) {
    res.json({
      status: 'error',
      message: 'Message is required'
    })
    return
  }
  const newOrder = await Order.create({
    Message: req.body.Message
  })
  await Paitent.updateOne(
    { _id: req.params.paitentId },
    { OrderId: newOrder._id }
  )
  res.json({
    status: 'success',
    data: newOrder
  })
}

const updateOrderById = async (req, res) => {
  if (!req.body.Message) {
    res.json({
      status: 'error',
      message: 'Message is required'
    })
    return
  }
  const order = await Order.findOneAndUpdate(
    { _id: req.params.orderId },
    { $set: { Message: req.body.Message } },
    { 'new': true }
  )
  res.json({
    status: 'success',
    data: order
  })
}

const getOrderById = async (req, res) => {
  const order = await Order.findOne({ _id: req.params.orderId })
  res.json({
    status: 'success',
    data: order
  })
}
