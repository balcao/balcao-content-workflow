import { Account } from "./account.interface"
import { Category } from "./category.interface"
import { Story } from "./story.interface"

export interface Topic {
    id: number
    title: string
    slug: string
    description?: string
    imgUrl?: string
    category?: Category
    createdAt: Date
    storyCount: number
    stories?: Story[]
    authorId: string
    active: boolean
    author: Account
}