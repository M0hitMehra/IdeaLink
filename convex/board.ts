
import { v } from "convex/values"
import { mutation } from "./_generated/server"

const images = [
    "/placeholder/1.svg",
    "/placeholder/2.svg",
    "/placeholder/3.svg",
    "/placeholder/4.svg",
    "/placeholder/5.svg",
    "/placeholder/6.svg",
    "/placeholder/7.svg",
    "/placeholder/8.svg",
    "/placeholder/9.svg",
    "/placeholder/10.svg",
]

export const create = mutation({
    args: {
        orgId: v.string(),
        tite: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error("Unauthorized")
        }

        const randomImage = images[Math.floor(Math.random() * images.length)]
        const board = await ctx.db.insert("boards", {
            title: args.tite,
            orgId: args.orgId,
            authorId: identity.subject,
            authorName: identity.name!,
            imageUrl: randomImage
        })
        return board
    }
})