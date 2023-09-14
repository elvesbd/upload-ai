import { openai } from '../lib/openai';
export class ChatCompleteService {
  static async execute(transcription: string, prompt: string, temperature: number) {
    try {
      const promptMessage = prompt.replace('{transcription}', transcription)
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo-16k',
        temperature,
        messages: [
          {
            role: 'user',
            content: promptMessage
          }
        ],
        stream: true,
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
