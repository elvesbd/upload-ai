import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Separator } from "@radix-ui/react-separator";
import { FileVideo, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { getFFmpeg } from "@/lib/ffmpeg";
import { fetchFile } from '@ffmpeg/util';
import { api } from "@/lib/axios";
import { TranscriptionResponse, UploadVideoResponse } from "@/interfaces";
import { Status, statusMessages } from "@/types";
import { cn } from "@/lib/utils";

interface VideoInputFormProps {
  onVideoUploaded: (id: string) => void;
}

export function VideoInputForm({ onVideoUploaded }: VideoInputFormProps) {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [status, setStatus] = useState<Status>('waiting')
  const promptInputRef = useRef<HTMLTextAreaElement>(null)

  const previewUrl = useMemo(() => {
    if(!videoFile) return null

    return URL.createObjectURL(videoFile)
  }, [videoFile])

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget
    if(!files) return

    const selectedFile = files[0]
    setVideoFile(selectedFile)
  }

  async function convertVideoToAudio(video: File) {
    const ffmpeg = await getFFmpeg()
    await ffmpeg.writeFile('input.mp4', await fetchFile(video))

    ffmpeg.on('progress', progress => {
      console.log(
        'Convert progress: ' + Math.round(progress.progress * 100
      ));
    })

    await ffmpeg.exec([
      '-i',
      'input.mp4',
      '-map',
      '0:a',
      '-b:a',
      '20k',
      '-acodec',
      'libmp3lame',
      'output.mp3'
    ])

    const data = await ffmpeg.readFile('output.mp3')
    const audioFileBlob = new Blob([data], { type: 'audio/mpeg' })
    const audioFile = new File([audioFileBlob], 'audio.mp3', {
      type: 'audio/mpeg'
    })

    return audioFile
  }

  async function handleUploadVideo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const prompt = promptInputRef.current?.value
    if(!videoFile) return

    setStatus('converting')
    const audioFile = await convertVideoToAudio(videoFile)
    
    const formDate = new FormData()
    formDate.append('file', audioFile)
    setStatus('uploading')

    const { data: { video: { id: videoId } } } = await api.post<UploadVideoResponse>('/videos', formDate);
    setStatus('generating')

    await api.post<TranscriptionResponse>(`/videos/${videoId}/transcriptions`, {
      prompt
    })
    setStatus('success')
    onVideoUploaded(videoId)
  }

  return (
    <form onSubmit={handleUploadVideo} className="space-y-6">
      <label
        htmlFor="video"
        className="relative border border-dashed text-sm text-muted-foreground flex items-center justify-center flex-col gap-2 rounded-md aspect-video cursor-pointer hover:bg-primary/5"
      >
        {previewUrl ? (
          <video
            src={previewUrl}
            controls={false}
            className="absolute inset-0 pointer-events-none"
          />
        ) : (
          <>
            <FileVideo className="w-4 h-4" />
            Selecione um vídeo
          </>
        )}
      </label>
      <input
        type="file"
        id="video"
        accept="video/mp4"
        className="sr-only"
        onChange={handleFileSelected}
      />

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="transcription-prompt">
          Prompt de transcrição
        </Label>

        <Textarea
          id="transcription-prompt"
          ref={promptInputRef}
          disabled={status !== 'waiting'}
          className="h-20 leading-relaxed resize-none"
          placeholder="Inclua palavras-chaves mencionadas no vídeo separadas por (,)"
        />
      </div>

      <Button
        disabled={status !== 'waiting'}
        type="submit"
        className={cn(
          "w-full",
          status === 'success' && "bg-emerald-400"
        )}
      >
        {status === 'waiting' ? (
          <>
            Carregar vídeo
            <Upload className="w-4 h-4 ml-2" />
          </>
        ) : (
          statusMessages[status]
        )}
      </Button>
    </form>
  )
}