import { FastifyInstance } from "fastify";

export async function healthCheckRoute(app: FastifyInstance) {
  app.get('/health-check', () => {
    return {
      name: 'API Upload-AI',
      status: 'OK'
    }
  })  
}