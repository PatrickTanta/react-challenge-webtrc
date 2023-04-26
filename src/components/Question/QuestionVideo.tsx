import { useRef, FC, useState } from 'react'
import { PlayIcon } from '../icons/PlayIcon'
import { StopIcon } from '../icons/StopIcon'

interface Props {
    id: number
    isDetail?: boolean
    text: string
    recordedVideo?: string | null
    onSetQuestionVideo: (id: number, value: any) => void
}

export const QuestionVideo: FC<Props> = ({ id, isDetail, text, recordedVideo, onSetQuestionVideo }) => {
    const [recordedBlob, setRecordedBlob] = useState([])
    const streamRef = useRef<MediaStream | null>(null)
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)

    const videoRef = useRef<HTMLVideoElement>(null)

    const startRecording = async () => {
        setRecordedBlob([])

        if (!(await hasPermissions())) return

        try {
            if (!videoRef.current) return
            videoRef.current.srcObject = streamRef.current

            const mediaRecorder = new MediaRecorder(streamRef.current!, { mimeType: 'video/webm; codecs=vp9' })
            setMediaRecorder(mediaRecorder)

            mediaRecorder.ondataavailable = (event: any) => {
                if (event.data && event.data.size > 0) {
                    setRecordedBlob((prevState) => {
                        return [...prevState, event.data]
                    })
                }
            }
            mediaRecorder.onstop = (event) => {
                const blobObj = new Blob(recordedBlob, { type: 'video/webm' })
                const url = URL.createObjectURL(blobObj)
                onSetQuestionVideo(id, url)
            }
            mediaRecorder.start()
        } catch (e) {
            console.log('Error accessing media devices', e)
        }
    }

    const stopRecording = () => {
        if (!mediaRecorder) return
        mediaRecorder.stop()
    }

    const hasPermissions: () => Promise<boolean> = async () => {
        try {
            const streamNavigator = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            streamRef.current = streamNavigator
            return true
        } catch (e) {
            console.error('navigator.getUserMedia error:', e)
            return false
        }
    }

    return (
        <div
            className={`flex h-96 w-60 flex-col justify-center place-self-center overflow-hidden rounded-lg border border-black bg-card-bg ${
                isDetail ? 'h-full w-full md:h-[708px] md:w-[864px]' : 'h-96 w-60 sm:h-96'
            }`}
        >
            <div className="relative flex-grow overflow-hidden">
                {recordedVideo ? (
                    <video
                        src={recordedVideo}
                        controls
                        loop
                        playsInline
                        className="h-full w-full rounded-t-lg bg-black"
                    />
                ) : (
                    <video ref={videoRef} autoPlay playsInline muted className="h-full w-full rounded-t-lg bg-black" />
                )}

                {!recordedVideo && (
                    <button
                        className="absolute bottom-2 left-2 flex h-12 w-12 items-center justify-center rounded-full bg-play-btn focus:outline-none"
                        onClick={() => (streamRef.current ? stopRecording() : startRecording())}
                    >
                        {streamRef.current ? <StopIcon /> : <PlayIcon />}
                    </button>
                )}
            </div>
            <a className="h-15 bg-red max-h-18 overflow-hidden text-ellipsis p-3" href={isDetail ? '#' : '/question/5'}>
                <span title={text} className="mb-0 text-base text-black sm:text-sm">
                    {text}
                </span>
            </a>
        </div>
    )
}
