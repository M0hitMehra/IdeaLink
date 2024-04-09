"use client"

import React, { useState } from 'react'
import Participants from './participants'
import Toolbar from './toolbar'
import { useCanRedo, useCanUndo, useHistory, useSelf } from '@/liveblocks.config'
import Info from './info'
import { CanvasMode, CanvasState } from '@/types/Canvas'
import {CursorPresence} from "../_components/cursor-presence.jsx"

interface CanvasProps {
    boardId: string
}

const Canvas = ({ boardId }: CanvasProps) => {
    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None
    })
    const history = useHistory()
    const canUndo = useCanUndo()
    const canRedo = useCanRedo()
    const info = useSelf(me => me.info)
    console.log(info)
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
            <svg className=' h-[100vh] w-[100vw] '>
                <g>
                    <CursorPresence />
                </g>
            </svg>
        </main>
    )
}

export default Canvas