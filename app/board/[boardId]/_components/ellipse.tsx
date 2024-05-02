import { colorToCss } from "@/lib/utils";
import { EllipseLayer } from "@/types/Canvas";



interface EllipsePoprs {
    id: string;
    layer: EllipseLayer;
    onPointerDown: (e: React.PointerEvent, layerId: string) => void,
    selectionColor?: string
}


const Ellipse = ({ id, selectionColor, layer, onPointerDown }: EllipsePoprs) => {
    const { x, y, width, height, fill } = layer

    return (
        <ellipse
            className=" drop-shadow-md"
            onPointerDown={(e) => onPointerDown(e, id)}
            style={{
                transform: `translate(${x}px, ${y}px)`
            }}
            cx={width/2}
            cy={height/2}
            rx={width/2}
            ry={height/2}
            fill={fill ? colorToCss(fill) : "#0b3c7f"}
            strokeWidth={1}
            stroke={selectionColor || "transparent"}

        />

    )
}

export default Ellipse