import React from 'react'
import EmptySearch from './empty-search'
import EmptyFavorites from './sidebar/empty-favorites'
import EmptyBoard from './sidebar/empty-board'

interface BoardListProps {
    orgId: string,
    query: {
        search?: string,
        favorites?: string
    }
}
const BoardList = ({ orgId, query }: BoardListProps) => {
    const data = []
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
            b
        </div>
    )
}

export default BoardList