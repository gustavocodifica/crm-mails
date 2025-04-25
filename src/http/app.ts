import fastify from 'fastify'

import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import { cronEmailsRoute } from './routes/cron-emails'

export const app = fastify()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(cronEmailsRoute)
