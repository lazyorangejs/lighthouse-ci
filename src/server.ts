import * as dotenv from 'dotenv-safe'

import 'reflect-metadata'

import * as path from 'path'
import * as express from 'express'
dotenv.config({ example: path.resolve(__dirname, '../.env.example') })

import * as serveHandler from 'serve-handler'
import * as bodyParser from 'body-parser'
import { InversifyExpressServer } from 'inversify-express-utils'

import './controllers'
import { bootstrapContainer } from './inversify.config'
import { startCron } from './cron'

const logger = console

const app = express()
app.use(bodyParser.urlencoded({
  extended: true,
}))
app.use(bodyParser.json())

app.get('/*', (req, res, next) => {
  if (req.url.includes('/api')) {
    return next()
  }

  serveHandler(req, res, {
    cleanUrls: true,
    public: path.resolve(process.cwd(), 'reports'),
    unlisted: ['.gitkeep'],
  })
})

export const start = async () => {
  const container = await bootstrapContainer()
  const server = new InversifyExpressServer(container, null, { rootPath: '/api' }, app)
  server.build()

  const port = parseInt(process.env.PORT || '3033', 10)
  app.listen(port, async () => {
    logger.info(`Server starting at ${port}`)
  })
  await startCron(`http://localhost:${port}`, `${process.env.SUPER_USERNAME}:${process.env.SUPER_PASSWORD}`)
}

start()
  .then(() => logger.info('Success!'))
  .catch((err) => logger.error(err))
