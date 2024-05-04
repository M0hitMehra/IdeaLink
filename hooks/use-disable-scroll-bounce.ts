import { useEffect } from "react"



export const useDisableScrollBounce = () => {
    useEffect(() => {
        document.body.classList.add("overflow-hidden", "overscroll-none")
        return () => {
        document.body.classList.add("overflow-hidden", "overscroll-none")
        }
    }, [])

}