import { openai } from '../lib/openai';

export class ChatCompleteService {
  static async execute(transcription: string, template: string, temperature: number) {
    try {
      const promptMessage = template.replace('{transcription}', transcription)
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo-16k',
        temperature,
        messages: [
          {
            role: 'user',
            content: promptMessage
          }
        ]
      })

      if (!response) {
        throw new Error('Response from OpenAI API is empty.')
      }

      return response
    } catch (error) {
      console.error(error)
      throw new Error(`Failed to create chat: ${error.message}`)
    }
  }
}
