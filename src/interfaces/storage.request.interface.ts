import { Account } from "./account.interface"
import { Episode } from "./episode.interface"
import { Podcast } from "./podcast.interface"

export interface StorageRequest {
    docName: string
    doc: Podcast | Episode
    docType: 'podcast' | 'episode'
    author?: Account
    cid?: string
}