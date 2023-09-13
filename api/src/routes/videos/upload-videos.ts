import { FastifyInstance } from "fastify";
import { fastifyMultipart } from '@fastify/multipart';
import { CreateVideoService } from "../../services";
import { MP3UploadService } from "../../utils";

export async function uploadVideoRoute(app: FastifyInstance) {
  app.register(fastifyMultipart, {
    limits: {
      fileSize: 1_048_576 * 25, // 25mb
    }
  })

  app.post('/videos', async (request, reply) => {
    const data = await request.file()
    if(!data)
      return reply.status(400).send({ error: 'Missing file input' })

    const uploadDestination = await MP3UploadService.uploadFile(data)
    const video = await CreateVideoService.execute(data.filename, uploadDestination)

    return {
      video
    }
  })  
}