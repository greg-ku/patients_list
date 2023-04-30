import express from 'express'
import bodyParser from 'body-parser'
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  server
    .use(bodyParser.json())
    .use(handle)
    .listen(dev ? 3000 : 80, (err) => {
      if (err) throw err
      if (dev) console.log('> Ready on http://localhost:3000')
    })
})
