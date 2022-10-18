import { Account } from "./account.interface"
import { Category } from "./category.interface"
import { Channel } from "./channel.interface"
import { Episode } from "./episode.interface"
import { Topic } from "./topic.interface"

export interface Story {
    id: number
    title: string
    slug: string
    tagline?: string
    description?: string
    imgUrl?: string
    introMediaUrl?: string
    channel: Channel
    category: Category
    createdAt: Date
    episodes?: any[]
    epCount?: number
    active: boolean
    featured: boolean
    topic?: Topic
    author: Account
}