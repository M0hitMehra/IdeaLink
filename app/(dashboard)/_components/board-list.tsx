import React from 'react'
import EmptySearch from './empty-search'
import EmptyFavorites from './sidebar/empty-favorites'
import EmptyBoard from './sidebar/empty-board'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import BoardCard from './board-card'
import NewBoardButton from './new-board-button'

interface BoardListProps {
    orgId: string,
    query: {
        search?: string,
        favorites?: string
    }
}
const BoardList = ({ orgId, query }: BoardListProps) => {
    const data = useQuery(api.boards.get, { orgId })

    if (data === undefined) {
        return <div>Loading...</div>
    }
    if (!data?.length && query.search) {
        return (
            <EmptySearch />
        )
    }

    if (!data?.length && query.favorites) {
        return (
            <EmptyFavorites />
        )
    }

    if (!data?.length) {
        return (
            <EmptyBoard />)
    }
    return (
        <div>
            <h2 className='text-3xl'>
                {query.favorites ? "Favorite boards" : "Team boards"}
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10'>
                <NewBoardButton orgId={orgId} />
                {
                    data?.map((board) => (
                        <BoardCard
                            key={board._id}
                            id={board._id}
                            title={board.title}
                            imageUrl={board.imageUrl}
                            authorId={board.authorId}
                            authorName={board.authorName}
                            createdAt={board._creationTime}
                            orgId={board.orgId}
                            isFavorite={false}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default BoardList