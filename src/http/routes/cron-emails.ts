import { InitializeEmailsProcessService } from '@/services/initialize-emails-process'

import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const cronEmailsRoute: FastifyPluginAsyncZod = async app => {
  app.get('/api/cron/emails', {}, async request => {
    const requestURL = `${request.protocol}://${request.host}`

    const initializeEmailsProcessService = new InitializeEmailsProcessService()

    await initializeEmailsProcessService.execute({
      requestURL,
    })

    return {
      message: 'Emails process initialized.',
    }
  })
}
