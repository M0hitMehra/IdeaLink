"use client"

import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import useApiMutation from '@/hooks/use-api-mutation'
import { useOrganization } from '@clerk/nextjs'
import { useMutation } from 'convex/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

const EmptyBoard = () => {
    const router = useRouter()
    const { mutate, pending } = useApiMutation(api.board.create)
    const { organization } = useOrganization()
    const onClick = () => {
        if (!organization) return
        mutate({
            orgId: organization.id,
            title: "Untitled",
        })
            .then((id) => {
                toast.success("Board created successfully");
                router.push(`/board/${id}`)
            }
            )
            .catch(error => toast.error("Failed to create board"))
    }
    return (
        <div className=' h-full flex justify-center items-center flex-col'>
            <Image src={"/note.svg"} alt='Empty Boards' height={200} width={200} className=' drop-shadow-2xl' />
            <h2 className=' text-2xl font-semibold mt-6'>
                Create your first board
            </h2>
            <p className=' text-muted-foreground text-sm mt-2'>Start creating board for your organization</p>
            <div className='mt-6'>
                <Button size={"lg"} onClick={onClick} disabled={pending}>
                    Create Boards
                </Button>
            </div>
        </div>
    )
}

export default EmptyBoard