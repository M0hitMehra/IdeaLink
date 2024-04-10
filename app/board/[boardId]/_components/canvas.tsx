"use client"

import React, { useCallback, useState } from 'react'
import Participants from './participants'
import Toolbar from './toolbar'
import { useCanRedo, useCanUndo, useHistory, useMutation, useSelf } from '@/liveblocks.config'
import Info from './info'
import { Camera, CanvasMode, CanvasState } from '@/types/Canvas'
import { CursorPresence } from "../_components/cursor-presence.jsx"
import { pointerEventToCanvasPoint } from '@/lib/utils'

const MAX_LAYERS = 100

interface CanvasProps {
    boardId: string
}

const Canvas = ({ boardId }: CanvasProps) => {
    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None
    })
    const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 })
    const history = useHistory()
    const canUndo = useCanUndo()
    const canRedo = useCanRedo()

    const onWheel = useCallback((e: React.WheelEvent) => {
        setCamera((camera) => ({
            x: camera.x - e.deltaX,
            y: camera.y - e.deltaY,
        }))
    }, [])
    const info = useSelf(me => me.info)
    console.log(info)

    const onPointerMove = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
        e.preventDefault()
        const current = pointerEventToCanvasPoint(e, camera)
        setMyPresence({ cursor: current })
    }, [])

    const onPointerLeave = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
        e.preventDefault()
        setMyPresence({ cursor: null })

    }, [])

    return (
        <main className=' h-full w-full relative bg-neutral-100 touch-none'>
            <Info boardId={boardId} />
            <Participants />
            <Toolbar
                CanvasState={canvasState}
                setCanvasState={setCanvasState}
                canRedo={canRedo}
                canUndo={canUndo}
                undo={history.undo}
                redo={history.redo}
            />
            <svg className=' h-[100vh] w-[100vw] '
                onWheel={onWheel}
                onPointerMove={onPointerMove}
                onPointerLeave={onPointerLeave}
            >
                <g
                    style={{
                        transform: `translate(${camera.x}px ,${camera.y}px)`
                    }}
                >
                    <CursorPresence />
                </g>
            </svg>
        </main>
    )
}

export default Canvas