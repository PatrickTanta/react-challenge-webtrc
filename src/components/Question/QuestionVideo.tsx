import { useRef, useEffect, FC, useState } from 'react'
import { PlayIcon } from '../icons/PlayIcon'

interface Props {
    isDetail?: boolean
    text: string
}

export const QuestionVideo: FC<Props> = ({ isDetail, text }) => {
    const [blob, setBlob] = useState([])
    const [stream, setStream] = useState<MediaStream | null>(null)
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
    const [recordedVideoUrl, setRecordedVideoUrl] = useState('')
    const videoRef = useRef<HTMLVideoElement>(null)

    const startRecording = async () => {
        if (!(await hasPermissions())) return
        try {
            console.log('videoRef ', videoRef, ' ', videoRef.current)
            console.log('stream ', stream)

            if (!videoRef.current) return

            videoRef.current.srcObject = stream
            const mediaRecorder = new MediaRecorder(stream!, { mimeType: 'video/webm; codecs=vp9' })

            mediaRecorder.ondataavailable = (e) => {
                setBlob((prevState): any => {
                    return [...prevState, e.data]
                })
            }
            mediaRecorder.onstop = () => {
                const blobObj = new Blob(blob, { type: 'video/webm' })
                const url = URL.createObjectURL(blobObj)
                setRecordedVideoUrl(url)
            }
            setMediaRecorder(mediaRecorder)
            mediaRecorder.start()
        } catch (e) {
            console.log('Error accessing media devices', e)
        }
    }

    const hasPermissions: () => Promise<boolean> = async () => {
        console.log('start hasPermissions ')
        if (stream) return true
        try {
            const streamNavigator = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            console.log('streamNavigator ', streamNavigator)
            setStream(streamNavigator)
            return true
        } catch (e) {
            console.error('navigator.getUserMedia error:', e)
            return false
        }
    }
    useEffect(() => {
        // async function getUserMedia() {
        //     try {
        //         console.log('videoRef ', videoRef)
        //         if (videoRef.current) {
        //             videoRef.current.srcObject = stream
        //             // videoRef.current.play()
        //         }
        //     } catch (error) {
        //         console.log('Error accessing media devices: ', error)
        //     }
        // }
        // getUserMedia()
    }, [])

    return (
        <div
            className={`flex h-96 w-60 flex-col justify-center place-self-center overflow-hidden rounded-lg border border-black bg-card-bg ${
                isDetail ? 'h-full w-full md:h-[708px] md:w-[864px]' : 'h-96 w-60 sm:h-96'
            }`}
        >
            <div className="relative flex-grow overflow-hidden">
                <video ref={videoRef} className="h-full w-full rounded-t-lg bg-black"></video>
                <button
                    className="absolute bottom-2 left-2 flex h-12 w-12 items-center justify-center rounded-full bg-play-btn focus:outline-none"
                    onClick={() => startRecording()}
                >
                    <PlayIcon />
                </button>
            </div>
            <a className="h-15 bg-red max-h-18 overflow-hidden text-ellipsis p-3" href={isDetail ? '#' : '/question/5'}>
                <span title={text} className="mb-0 text-base text-black sm:text-sm">
                    {text}
                </span>
            </a>
        </div>
    )
}
