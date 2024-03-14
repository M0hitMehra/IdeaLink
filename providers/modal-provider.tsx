"use client"

import RenameModal from "@/components/modals/rename-modal"
import { useEffect, useState } from "react"


const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(isMounted)
    }, [])

    if (!isMounted) {
        return null
    }
    return (
        <RenameModal />
    )
}

export default ModalProvider