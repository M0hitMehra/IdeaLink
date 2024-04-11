"use client"

interface LayerPreviewProps {
    id: string;
    onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void,
    selectionColor?: null
}

const LayerPreview = ({ id, onLayerPointerDown, selectionColor }: LayerPreviewProps) => {
    return (
        <div>LayerPreview</div>
    )
}

export default LayerPreview