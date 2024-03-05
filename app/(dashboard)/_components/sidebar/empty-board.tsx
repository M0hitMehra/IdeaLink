"use client"

import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { useOrganization } from '@clerk/nextjs'
import { useMutation } from 'convex/react'
import Image from 'next/image'
import React from 'react'

const EmptyBoard = () => {
    const create = useMutation(api.board.create)
    const { organization } = useOrganization()
    const onClick = () => {
        if (!organization) return
        create({
            orgId: organization.id,
            tite: "Untitled",
        })
    }
    return (
        <div className=' h-full flex justify-center items-center flex-col'>
            <Image src={"/note.svg"} alt='Empty Boards' height={200} width={200} className=' drop-shadow-2xl' />
            <h2 className=' text-2xl font-semibold mt-6'>
                Create your first board
            </h2>
            <p className=' text-muted-foreground text-sm mt-2'>Start creating board for your organization</p>
            <div className='mt-6'>
                <Button size={"lg"} onClick={onClick}>
                    Create Boards
                </Button>
            </div>
        </div>
    )
}

export default EmptyBoard