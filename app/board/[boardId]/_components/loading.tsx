
import { Loader } from "lucide-react"
import  { InfoSkeleton } from "./info"
import  { ParticipantsSkeleton } from "./participants"
import   { ToolbarSkeleton } from "./toolbar"


const Loading = () => {
  return (
    <main className=' h-full w-full relative bg-neutral-100 touch-none flex justify-center items-center'>
      <Loader className="h-6 w-6 text-muted-foreground animate-spin" />
      <InfoSkeleton />
      <ParticipantsSkeleton />
      <ToolbarSkeleton />
    </main>
  )
}

export default Loading