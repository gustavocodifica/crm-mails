import fastify from 'fastify'

import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import { cronEmailsRoute } from './routes/cron-emails'
import { sendScheduledEmailsRoute } from './routes/send-scheduled-emails'

export const app = fastify()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(cronEmailsRoute)
app.register(sendScheduledEmailsRoute)
