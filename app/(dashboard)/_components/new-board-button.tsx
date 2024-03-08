'use client'

import { cn } from "@/lib/utils";

interface NewBoardButtonProps {
    orgId: string;
    disabled?: boolean;
}

const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
    return (
        <button
            disabled={disabled}
            onClick={() => { }}
            className={cn(``)}
        >
            NewBoardButton
        </button>
    )
}

export default NewBoardButton