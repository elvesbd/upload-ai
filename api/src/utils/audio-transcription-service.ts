import { createReadStream } from 'fs';
import { openai } from '../lib/openai';

export class AudioTranscriptionService {
  static async execute(videoPath: string, prompt: string) {
    const audioReadStream = createReadStream(videoPath);
    try {
      const response = await openai.audio.transcriptions.create({
        file: audioReadStream,
        model: 'whisper-1',
        language: 'pt',
        response_format: 'json',
        temperature: 0,
        prompt
      });
      if (!response) {
        throw new Error('Audio transcription failed')
      }

      return response.text;

    } catch (error) {
      console.error(error)
      throw new Error('Audio transcription failed: ' + error.message)
    }

  }
}
