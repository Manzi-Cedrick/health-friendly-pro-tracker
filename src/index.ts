import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import 'dotenv/config'

import * as middleware from './middleware'

import { patientRouter } from './routers/patient.router'
import { establishConnection } from './config/connect'
import logger from './common/logger'
import { recordRouter } from './routers/record.router'
import { Swaggiffy } from 'swaggiffy'

const PORT = process.env.PORT || 8080
const ENV = process.env.NODE_ENV || 'production'

const app: Express = express()

app.use(helmet())

app.use(cors())

app.use(express.json())

app.use(middleware.httpLogger)
// app.use(middleware.connection)
app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Welcome')
})

// Articles routes

app.use('/patients', patientRouter) 
app.use('/records', recordRouter)

// Error hanlding middleware

app.use(middleware.errorHandler)

app.use(middleware.notFoundHandler)

let server:any
establishConnection()
  .then(() => {
    server = app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT} in ${ENV} environment`)
    })
  })
  .catch((error) => {
    logger.error('Unable to connect to the database:', error)
  }
) 
new Swaggiffy().setupExpress(app).swaggiffy()
export { app as default, server }