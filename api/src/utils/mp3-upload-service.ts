import { createWriteStream } from 'node:fs';
import path from "node:path";
import { pipeline } from 'node:stream';
import { randomUUID } from "node:crypto";
import { promisify } from "node:util";
import { MultipartFile } from './interfaces';

const pump = promisify(pipeline)

export class MP3UploadService {

  static async uploadFile(file: MultipartFile) {
    const extension = path.extname(file.filename)
    if(extension !== '.mp3')
      throw new Error('Invalid type, please upload a MP3')

    const fileBaseName = path.basename(file.filename, extension)
    const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`
    const uploadDestination = path.resolve(__dirname, '../../tmp', fileUploadName)
    await pump(file.file, createWriteStream(uploadDestination))

    return uploadDestination;
  }
}
