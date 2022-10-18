import { Category } from "./category.interface"
import { Podcast } from "./podcast.interface"

export interface Episode {
    id: number
    title: string
    summary?: string
    description?: string
    imgUrl?: string
    duration?: string
    releaseDate?: Date
    mediaUrl: string
    mediaType?: string
    mediaSize?: BigInt
    rating?: string
    podcast: Podcast
    categories?: Category[]
    slug?: string,
    link?: string

}