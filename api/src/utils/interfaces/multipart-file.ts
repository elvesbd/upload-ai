import { Readable } from "stream";

interface BusboyFileStream extends Readable {}
interface MultipartFields {
  [fieldname: string]: Multipart | Multipart[] | undefined;
}
type Multipart = MultipartFile | MultipartValue;

export interface MultipartFile {
  type: 'file';
  toBuffer: () => Promise<Buffer>;
  file: BusboyFileStream;
  fieldname: string;
  filename: string;
  encoding: string;
  mimetype: string;
  fields: MultipartFields;
}

interface MultipartValue<T = unknown> {
  type: 'field';
  value: T;
  fieldname: string;
  mimetype: string;
  encoding: string;
  fieldnameTruncated: boolean;
  valueTruncated: boolean;
  fields: MultipartFields;
}


