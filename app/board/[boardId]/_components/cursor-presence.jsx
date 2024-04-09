"use client";

import { useOthersConnectionIds } from "@/liveblocks.config";
import { memo } from "react";

const Cursors = () => {
  const ids = useOthersConnectionIds();
  return (
    <>
      {ids.map((connectionId) => (
        <Cursor key={connectionId} connectionId={connectionId} />
      ))}
    </>
  );
};

export const CursorPresence = memo(() => {
  return <Cursors />;
});

CursorPresence.displayName = "CursorPresence";
