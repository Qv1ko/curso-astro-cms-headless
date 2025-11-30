import { defineAction } from 'astro:actions'
import type { LikesResponse } from './model'
import { addLike, getLikes } from './repository'

export const server = {
    addLike: defineAction<LikesResponse>({
        async handler(slug) {
            return { likes: await addLike(slug) }
        },
    }),
    getLikes: defineAction<LikesResponse>({
        async handler(slug) {
            return { likes: await getLikes(slug) }
        },
    }),
}