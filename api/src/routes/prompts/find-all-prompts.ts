import { FastifyInstance } from "fastify";
import { FindAllPromptsService } from "../../services";

export async function findAllPromptsRoute(app: FastifyInstance) {
  app.get('/prompts', async () => {
    const prompts = await FindAllPromptsService.execute()
    return prompts
  })
}