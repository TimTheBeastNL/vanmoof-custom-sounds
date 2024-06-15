"use client"

import { useEffect, useRef, useState } from "react"
import { CommonProps } from "./BellSoundWalkthrough"
import { FFmpeg } from "@ffmpeg/ffmpeg"
import { fetchFile, toBlobURL } from "@ffmpeg/util"
import WalkthroughButton from "./WalkthroughButton"

const globalFfmpeg = new FFmpeg()

export default function ConvertStep({ onDismiss, selectedFile, onConversionCompleted, onError }: CommonProps & {
    selectedFile: File,
    onConversionCompleted: (selectedFile: Uint8Array) => void,
    onError: (error: string) => void,
}) {
    const [showLog, setShowLog] = useState<boolean>(false)
    const [converting, setConverting] = useState<boolean>(false)

    useEffect(() => {
         onConversionCompleted(selectedFile)
    }, [])

       

        log("Done!")
        setConverting(false)
    }

    return (
        <>
            <p>Selected file: {selectedFile.name}</p>
            <p>Converting to VanMoof bell format...</p>

            {showLog ? <textarea readOnly value={ffmpegLog}></textarea> : null}

            {!showLog ? <WalkthroughButton onClick={() => setShowLog(true)}>Show Log</WalkthroughButton> : null}
            <WalkthroughButton onClick={onDismiss}>Cancel</WalkthroughButton>

            <style jsx>{`
                ul li {
                    margin: 0.5rem 0;
                }

                textarea {
                    display: block;
                    min-width: 100%;
                    min-height: 150px;
                    margin-bottom: 1em;
                }
            `}</style>
        </>
    )
}
