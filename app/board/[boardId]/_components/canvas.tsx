"use client"

import React from 'react'
 import Participants from './participants'
import Toolbar from './toolbar'
import { useSelf } from '@/liveblocks.config'
import Info from './info'

interface CanvasProps {
    boardId: string
}

const Canvas = ({ boardId }: CanvasProps) => {
    const info = useSelf(me => me.info)
    console.log(info)
    return (
        <main className=' h-full w-full relative bg-neutral-100 touch-none'>
            <Info boardId={boardId} />
            <Participants />
            <Toolbar />
        </main>
    )
}

export default Canvas