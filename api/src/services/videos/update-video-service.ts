import { prisma } from '../../lib/prisma';

export class UpdateVideoService {
  static async execute(videoId: string, transcription: string) {
    await prisma.video.update({
      where: {
        id: videoId
      },
      data: {
        transcription
      }
    })
  }
}