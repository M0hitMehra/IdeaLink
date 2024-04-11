"use client"

import React, { useCallback, useState } from 'react'
import Participants from './participants'
import Toolbar from './toolbar'
import { useCanRedo, useCanUndo, useHistory, useMutation, useSelf, useStorage } from '@/liveblocks.config'
import Info from './info'
import { Camera, CanvasMode, CanvasState, Color, LayerType, Point } from '@/types/Canvas'
import { CursorPresence } from "../_components/cursor-presence.jsx"
import { pointerEventToCanvasPoint } from '@/lib/utils'
import { nanoid } from "nanoid"
import { LiveObject } from '@liveblocks/client'
import LayerPreview from './layer-preview'

const MAX_LAYERS = 100

interface CanvasProps {
    boardId: string
}

const Canvas = ({ boardId }: CanvasProps) => {
    const layerIds = useStorage(root => root.layerId)
    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None
    })
    const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 })
    const [lastUsedColor, setLastUsedColor] = useState<Color>({
        r: 0,
        b: 0,
        g: 0,
    })
    const history = useHistory()
    const canUndo = useCanUndo()
    const canRedo = useCanRedo()

    const insertLayer = useMutation((
        { storage, setMyPresence },
        layerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Text | LayerType.Note,
        position: Point
    ) => {
        const livelayers = storage.get("layers")
        if (livelayers.size >= MAX_LAYERS) {
            return;
        }
        const liveLayerIds = storage.get("layerId")
        const layerId = nanoid()
        const layer = new LiveObject({
            type: layerType,
            x: position.x,
            y: position.y,
            height: 100,
            width: 100,
            fill: lastUsedColor
        })

        liveLayerIds.push(layerId)
        livelayers.set(layerId, layer)

        setMyPresence({ selection: [layerId] }, { addToHistory: true })
        setCanvasState({ mode: CanvasMode.None })
    }, [lastUsedColor])

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

    const onPointerUp = useMutation(({ }, e) => {
        const point = pointerEventToCanvasPoint(e, camera)

        if (canvasState.mode === CanvasMode.Inserting) {
            insertLayer(canvasState.layerType, point)
        } else {
            setCanvasState({
                mode: CanvasMode.None
            })
        }
        history.resume()
    }, [camera, canvasState, insertLayer, history])
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
                onPointerUp={onPointerUp}
            >
                <g
                    style={{
                        transform: `translate(${camera.x}px ,${camera.y}px)`
                    }}
                >
                    {
                        layerIds.map((layerId) =>
                        (
                            <LayerPreview
                                key={layerId}
                                id={layerId}
                                onLayerPointerDown={() => { }}
                                selectionColor={null}
                            />
                        )
                        )
                    }
                    <CursorPresence />
                </g>
            </svg>
        </main>
    )
}

export default Canvas