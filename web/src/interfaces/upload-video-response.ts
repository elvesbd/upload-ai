export interface UploadVideoResponse {
  video: Video
}

interface Video {
  id: string
  createdAt: string
  name: string;
  path: string;
  transcription: string | null;
}