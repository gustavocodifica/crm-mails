import { db } from '@/db'
import { ContractorEmailsSentRepository } from '@/respositories/contractor-emails-sent'
import { SendScheduledEmailsService } from '@/services/send-scheduled-emails'

import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const sendScheduledEmailsRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/api/send-emails',
    {
      schema: {
        body: z.object({
          cursor: z.string().nullable(),
        }),
      },
    },
    async request => {
      const { cursor } = request.body

      const requestURL = `${request.protocol}://${request.host}`

      const contractorEmailsSentRepository = new ContractorEmailsSentRepository(
        db,
      )
      const sendScheduledEmailsService = new SendScheduledEmailsService(
        contractorEmailsSentRepository,
      )

      const { message } = await sendScheduledEmailsService.execute({
        requestURL,
        cursor,
      })

      return {
        message,
      }
    },
  )
}
