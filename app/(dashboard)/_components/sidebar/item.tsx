'use client'

import { cn } from "@/lib/utils";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import Image from "next/image";


interface ItemProps {
    id: string;
    name: string;
    imageUrl: string;
}

const Item: React.FC<ItemProps> = ({ id, name, imageUrl }) => {
    const { organization } = useOrganization()
    const { setActive } = useOrganizationList()

    const isActive = organization?.id === id

    const onClick = () => {
        if (!setActive) return
        setActive({ organization: id })
    }
    return (
        <div>
            <Image
                fill
                alt={name}
                src={imageUrl}
                onClick={onClick}
                className={cn(" rounded-md cursor-pointer opacity-75 hover:opacity-100 transition"
                    , isActive && "opacity-100"
                )}
            />

        </div>
    )
}

export default Item