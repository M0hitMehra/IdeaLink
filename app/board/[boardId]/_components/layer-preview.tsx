"use client"

import { useStorage } from "@/liveblocks.config";
import { LayerType } from "@/types/Canvas";
import { memo } from "react";
import Rectangle from "./rectangle";
import Ellipse from "./ellipse";

interface LayerPreviewProps {
    id: string;
    onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void,
    selectionColor?: string
}

const LayerPreview = memo(({ id, onLayerPointerDown, selectionColor }: LayerPreviewProps) => {
    const layer = useStorage(root => root.layers.get(id))
    if (!layer) return null;

    switch (layer.type) {
        case LayerType.Ellipse:
            return (
                <Ellipse
                    id={id}
                    layer={layer}
                    onPointerDown={onLayerPointerDown}
                    selectionColor={selectionColor}
                />
            )
        case LayerType.Rectangle:
            return (
                <Rectangle
                    id={id}
                    layer={layer}
                    onPointerDown={onLayerPointerDown}
                    selectionColor={selectionColor}
                />
            )




        default:
            console.warn("Layer type not supported");
            return null;
    }

})

LayerPreview.displayName = "LayerPreview"

export default LayerPreview