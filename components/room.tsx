"use client"

import { RoomProvider } from '@/liveblocks.config'
import { Layer } from '@/types/Canvas'
import { LiveList, LiveMap, LiveObject } from '@liveblocks/client'
import { ClientSideSuspense } from '@liveblocks/react'
import React, { ReactNode } from 'react'

interface RoomProps {
    children: ReactNode,
    roomId: string,
    fallback: NonNullable<ReactNode> | null,
}

const Room = ({ children, roomId, fallback }: RoomProps) => {

    return (
        <RoomProvider
            id={roomId}
            initialPresence={{
                cursor: null,
                selection: [],
                pencilDraft: null,
                penColor: null,
            }}
            initialStorage={{
                layers: new LiveMap<string, LiveObject<Layer>>(),
                layerId: new LiveList()
            }}
        >
            <ClientSideSuspense fallback={fallback}>
                {() => children}
            </ClientSideSuspense>
        </RoomProvider>
    )
}

export default Room