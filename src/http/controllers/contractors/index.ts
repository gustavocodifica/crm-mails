import { FastifyInstance } from "fastify";

import { fetchContractorsController } from "./fetch-contractors";

export async function contractorRoutes(app: FastifyInstance) {
  app.register(fetchContractorsController);
}
