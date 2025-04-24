import { makeFetchContractors } from "@/services/contractors/factories/make-fetch-contractors";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const fetchContractorsController: FastifyPluginAsyncZod = async (
  app
) => {
  app.get(
    "/contractors",
    {
      schema: {
        response: {
          200: z.object({
            contractors: z.array(
              z.object({
                id: z.string(),
                corporateReason: z.string(),
                email: z.string().email(),
                responsibleName: z.string(),
                joinDate: z.string(),
              })
            ),
          }),
        },
      },
    },
    async (_, reply) => {
      const fetchContractorsService = makeFetchContractors();

      const { contractors } = await fetchContractorsService.execute();

      return reply.send({
        contractors,
      });
    }
  );
};
