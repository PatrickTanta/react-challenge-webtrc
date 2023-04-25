import { useState } from 'react'

export const useMediaRecorder = () => {
    const [chumks, setChumks] = useState([])

    const startRecording = () => {
    const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9' })
        mediaRecorder.ondataavailable = e => {
            setChumks(prevState => {
                return [
                    ...prevState, e.data
                ]
            })
        };
        mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        video.src = url;
        };
        mediaRecorder.start();
    }

    const stopRecording = () => {
        mediaRecorder.stop()
    }

    const playRecording = () => {
        video.play()
    }

    const reRecord = () => {
        chunks = []
        video.src = ''
    }

    return {
        playRecording
        startRecording,
        stopRecording,
        reRecord.
    }
}