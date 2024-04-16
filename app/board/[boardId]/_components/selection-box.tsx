"use client";

import { useSelf } from "@/liveblocks.config";
import { Side, XYWH } from "@/types/Canvas";
import { memo } from "react";

interface SelectionBoxProps {
  onResizeHandlePointerDown: (corner: Side, initialBounds: XYWH) => void;
}

const HANDLE_WIDTH = 8
export const SelectionBox = memo(
  ({ onResizeHandlePointerDown }: SelectionBoxProps) => {
    const soloLayerId = useSelf((me) => me.presence.selection.length === 1 ? me.presence.selection[0] : null)
    return <div>SelectionBox</div>;
  }
);

SelectionBox.displayName = "SelectionBox";
