import { Category } from "./category.interface"
import { Enclosure } from "./enclosure.interface"
import { Podcast } from "./podcast.interface"

export interface Episode {
    title: string
    summary?: string
    description?: string
    imageURL?: string
    duration?: string
    pubDate?: string
    enclosure: Enclosure
    podcastCid?: string
    categories?: Category[]
    slug?: string
    link?: string
    language?: string
    order?: number
    blocked?: boolean
    explicit?: boolean
}