

import { useMutation } from 'convex/react'
import React, { useState } from 'react'

const useApiMutation = (mutationFunction: any) => {
    const [pending, setPending] = useState(false)
    const apiMutation = useMutation(mutationFunction)

    const mutate = (payload: any) => {
        setPending(true)
        return apiMutation(payload)
            .finally(() => setPending(false))
            .then((result) => {
                return result
            })
            .catch((error) => {
                throw error
            })
    }
    return { mutate, pending }
}

export default useApiMutation
