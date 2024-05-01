'use client'

import { colorToCss } from "@/lib/utils"
import { Color } from "@/types/Canvas"


interface ColorPickerProps {
    onChange: (color: Color) => void
}


const ColorPicker = ({ onChange }: ColorPickerProps) => {
    return (
        <div
            className=" flex flex-wrap gap-2 items-center max-w-[164px] pr-2 mr-2 border-r border-neutral-200"
        >
            <ColorButton color={{ r: 0, g: 255, b: 255 }} onClick={onChange} />
            <ColorButton color={{ r: 255, g: 0, b: 255 }} onClick={onChange} />
            <ColorButton color={{ r: 255, g: 255, b: 0 }} onClick={onChange} />
            <ColorButton color={{ r: 128, g: 0, b: 128 }} onClick={onChange} />
            <ColorButton color={{ r: 0, g: 128, b: 128 }} onClick={onChange} />
            <ColorButton color={{ r: 255, g: 127, b: 80 }} onClick={onChange} />
            <ColorButton color={{ r: 230, g: 230, b: 250 }} onClick={onChange} />
            <ColorButton color={{ r: 64, g: 224, b: 208 }} onClick={onChange} />
            <ColorButton color={{ r: 255, g: 218, b: 185 }} onClick={onChange} />
            <ColorButton color={{ r: 189, g: 255, b: 189 }} onClick={onChange} />
        </div>
    )
}

export default ColorPicker


interface ColorButtonProps {
    onClick: (color: Color) => void;
    color: Color;
}

const ColorButton = ({ onClick, color }: ColorButtonProps) => {
    return <button
        className=" w-8 h-8 items-center flex justify-center hover:opacity-75 transition"
        onClick={() => onClick(color)}
    >
        <div className="h-8 w-8 rounded-md border"
            style={{
                background: colorToCss(color)
            }}
        >

        </div>
    </button>
}