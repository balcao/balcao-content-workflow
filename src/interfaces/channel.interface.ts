import { Account } from "./account.interface"
import { Category } from "./category.interface"
import { Story } from "./story.interface"

export interface Channel {
    id: number
    title: string
    slug: string
    tagline?: string
    description?: string
    imgUrl?: string
    ftEpisodes?: BigInt[]
    ftPodcasts?: BigInt[]
    stories: Story[]
    category: Category
    updatedAt: Date
    author: Account
    active: boolean
    data: any
    cid?: string
    registeredId?: number
}