import { prisma } from '../../lib/prisma';

export class FindOneVideoService {
  static async execute(videoId: string) {
    const video = await prisma.video.findUniqueOrThrow({
      where: {
        id: videoId
      }
    })
    if (!video) {
      throw new Error('Vídeo not found');
    }

    return video;
  }
}