import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const EmptyBoard = () => {
    return (
        <div className=' h-full flex justify-center items-center flex-col'>
            <Image src={"/note.svg"} alt='Empty Boards' height={200} width={200} className=' drop-shadow-2xl' />
            <h2 className=' text-2xl font-semibold mt-6'>
                Create your first board
            </h2>
            <p className=' text-muted-foreground text-sm mt-2'>Start creating board for your organization</p>
            <div className='mt-6'>
                <Button size={"lg"}>
                    Create Boards
                </Button>
            </div>
        </div>
    )
}

export default EmptyBoard