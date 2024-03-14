"use client"
import { useRenameModal } from "@/store/use-rename-modal";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";


const RenameModal = () => {
    const { isOpen, onClose, initialValues, } = useRenameModal();
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                    Edit board title
                </DialogHeader>
                <DialogDescription>
                    Enter new title for this board
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}

export default RenameModal