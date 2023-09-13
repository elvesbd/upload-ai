import { FastifyInstance } from "fastify";
import { z } from 'zod';
import { AudioTranscriptionService } from '../../utils';
import {
  FindOneVideoService,
  UpdateVideoService
} from '../../services';

export async function createTranscriptionRoute(app: FastifyInstance) {
  app.post('/videos/:videoId/transcriptions', async (req) => {
    const paramsSchema = z.object({
      videoId: z.string().uuid()
    })
    const { videoId } = paramsSchema.parse(req.params)
    
    const bodySchema = z.object({
      prompt: z.string()
    })
    const { prompt } = bodySchema.parse(req.body)

    const video = await FindOneVideoService.execute(videoId)
    const videoPath = video.path
    const transcription = await AudioTranscriptionService.execute(videoPath, prompt)
    await UpdateVideoService.execute(videoId, transcription)

    return { transcription }
  })  
}