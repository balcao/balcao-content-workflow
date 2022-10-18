import { Category } from "./category.interface"
import { Episode } from "./episode.interface"

export interface Podcast {
    title: string
    slug?: string
    description?: string
    subtitle?: string
    imageURL?: string
    lastUpdated?: string
    link?: string
    language?: string
    editor?: string
    author?: string
    summary?: string
    categories?: Category[]
    owner?: any
    explicit?: boolean
    complete?: boolean
    blocked?: boolean
    episodes?: Episode[]
    epCount?: number
    feedUrl?: string
}