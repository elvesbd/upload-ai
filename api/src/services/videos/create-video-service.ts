import { prisma } from '../../lib/prisma';

export class CreateVideoService {
  static async execute(filename: string, path: string) {
    const video = await prisma.video.create({
      data: {
        name: filename,
        path: path
      }
    });
    if (!video) {
      throw new Error('Unable to create video');
    }

    return video;
  }
}