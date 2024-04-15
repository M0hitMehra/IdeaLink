import { colorToCss } from "@/lib/utils";
import { RectangleLayer } from "@/types/Canvas";


interface RectanglePoprs {
    id: string;
    layer: RectangleLayer;
    onPointerDown: (e: React.PointerEvent, layerId: string) => void,
    selectionColor?: string
}

const Rectangle = ({ id, selectionColor, layer, onPointerDown }: RectanglePoprs) => {
    const { x, y, width, height, fill } = layer
    return (
        <rect
            className=" drop-shadow-md"
            onPointerDown={(e) => onPointerDown(e, id)}
            style={{
                transform: `translate(${x}px, ${y}px)`
            }}
            x={0}
            y={0}
            height={height}
            width={width}
            fill={fill ? colorToCss(fill) : "#0b3c7f"}
            strokeWidth={1}
            stroke={selectionColor || "transparent"}
        />
    )
}

export default Rectangle