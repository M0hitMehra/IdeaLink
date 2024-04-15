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
        <circle
            className=" drop-shadow-md"
            onPointerDown={(e) => onPointerDown(e, id)}
            style={{
                transform: `translate(${x}px, ${y}px)`
            }}
            cx={0}
            cy={0}
            r={5}
            height={height}
            width={width}
            fill="#000"
            strokeWidth={1}
            stroke="transparent"
        />

    )
}

export default Ellipse