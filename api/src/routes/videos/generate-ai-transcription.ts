import { FastifyInstance } from "fastify";
import { z } from 'zod';
import { streamToResponse, OpenAIStream } from 'ai';
import { FindOneVideoService } from "../../services";
import { ChatCompleteService } from "../../utils";

export async function generateAITranscriptionRoute(app: FastifyInstance) {
  app.post('/ai/complete', async (req, reply) => {
    const bodySchema = z.object({
      videoId: z.string(),
      prompt: z.string(),
      temperature: z.number().min(0).max(1).default(0.5)
    })
    const { videoId, prompt, temperature } = bodySchema.parse(req.body)

    const video = await FindOneVideoService.execute(videoId)
    if(!video.transcription)
      return reply.status(400).send({ error: 'Vídeo transcription was not generated yet' })

    const response = await ChatCompleteService.execute(
      video.transcription,
      prompt,
      temperature,
    )

    const stream = OpenAIStream(response)
    streamToResponse(stream, reply.raw, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST'
      }
    })
  })  
}