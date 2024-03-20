"use client"

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import useApiMutation from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import ConfirmModal from "./confirm-modal";
import { Button } from "./ui/button";
import { useRenameModal } from "@/store/use-rename-modal";

interface ActionsProps {
    children: React.ReactNode;
    side?: DropdownMenuContentProps["side"]
    sideOffset?: DropdownMenuContentProps["sideOffset"]
    id: string;
    title: string;
}


export const Actions = ({
    side, children, sideOffset, id, title
}: ActionsProps) => {
    const { onOpen } = useRenameModal()
    const onCopyLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/board/${id}`)
            .then(() => {
                toast.success("Link copied successfully")
            })
            .catch(() => {
                toast.error("Failed to copy link")
            })
    }

    const { mutate, pending } = useApiMutation(api.board.remove)

    const onDelete = async () => {
        mutate({ id })
            .then(() => {
                toast.success("Board deleted successfully")
            })
            .catch(() => {
                toast.error("Failed to delete board")
            })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                onClick={(e) => e.stopPropagation()}
                side={side}
                sideOffset={sideOffset}
                className=" w-60"
            >
                <DropdownMenuItem className=" p-3 cursor-pointer" onClick={onCopyLink}>
                    <Link2 className="h-4 w-4 mr-2" />
                    Copy board link
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => onOpen(id, title)}
                    className="p-3 cursor-pointer"
                >
                    <Pencil className="h-4 w-4 mr-2" />
                    Rename
                </DropdownMenuItem>
                <ConfirmModal header="Delete Board ?" description="This will delete board and all its contents." disabled={pending} onConfirm={onDelete} >
                    <Button variant={"ghost"} className=" p-3 cursor-pointer text-sm w-full justify-start font-normal"  >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                    </Button>
                </ConfirmModal>
            </DropdownMenuContent>
        </DropdownMenu>
    )

}