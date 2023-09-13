import { FastifyInstance } from "fastify";
import { z } from 'zod';
import { FindOneVideoService } from "../../services";
import { ChatCompleteService } from "../../utils";

export async function generateAITranscriptionRoute(app: FastifyInstance) {
  app.post('/generate-transcription', async (req, reply) => {
    const bodySchema = z.object({
      videoId: z.string(),
      template: z.string(),
      temperature: z.number().min(0).max(1).default(0.5)
    })
    const { videoId, template, temperature } = bodySchema.parse(req.body)

    const video = await FindOneVideoService.execute(videoId)
    if(!video.transcription)
      return reply.status(400).send({ error: 'Vídeo transcription was not generated yet' })

    const message = await ChatCompleteService.execute(
      video.transcription,
      template,
      temperature,
    )

    return { message }
  })  
}