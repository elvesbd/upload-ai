import { prisma } from '../../lib/prisma';

export class FindAllPromptsService {
  static async execute() {
    const prompts = await prisma.prompt.findMany()
    if (!prompts.length) return []

    return prompts;
  }
}