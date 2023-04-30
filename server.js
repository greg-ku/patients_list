import next from 'next'

import createApiService from './api_services/create_api_service.js'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createApiService()
    .use(handle)
    .listen(dev ? 3000 : 80, (err) => {
      if (err) throw err
      if (dev) console.log('> Ready on http://localhost:3000')
    })
})
