import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const cronEmailsRoute: FastifyPluginAsyncZod = async (app) => {
  app.get("/api/cron/emails", {}, async (_, reply) => {
    const date = new Date();

    return reply.send({
      date: date.toISOString(),
    });
  });
};
