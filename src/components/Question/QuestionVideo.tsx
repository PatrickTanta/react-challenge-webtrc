import { useRef, useEffect, FC } from 'react'
import { PlayIcon } from '../icons/PlayIcon'

interface Props {
    isDetail?: boolean
    text: string
}

export const QuestionVideo: FC<Props> = ({ isDetail, text }) => {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        async function getUserMedia() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                if (videoRef.current) {
                    videoRef.current.srcObject = stream
                    // videoRef.current.play()
                }
            } catch (error) {
                console.log('Error accessing media devices: ', error)
            }
        }

        getUserMedia()
    }, [])

    return (
        <div
            className={`flex h-96 w-60 flex-col justify-center place-self-center overflow-hidden rounded-lg border border-black bg-card-bg ${
                isDetail ? 'h-full w-full md:h-[708px] md:w-[864px]' : 'h-96 w-60 sm:h-96'
            }`}
        >
            <div className="relative flex-grow overflow-hidden">
                <video ref={videoRef} className="h-full w-full rounded-t-lg bg-black"></video>
                <button className="absolute bottom-2 left-2 flex h-12 w-12 items-center justify-center rounded-full bg-play-btn focus:outline-none">
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
