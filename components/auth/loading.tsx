import Image from 'next/image'
import React from 'react'

const Loading = () => {
    return (
        <div className=' h-full w-full flex flex-col justify-center items-center'>
            <Image
                src={"/logo.svg"}
                alt='Logo'
                width={120}
                height={120}
                className=' rounded-full animate-pulse duration-900 scale-150' />
        </div>
    )
}

export default Loading