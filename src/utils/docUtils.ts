import { Podcast } from "../interfaces/podcast.interface";
import { StorageRequest } from "../interfaces/storage.request.interface";

export const podcastToStorageRequest = (podcast: Podcast, cid = ''): StorageRequest => {
    return {
        docName: podcast.slug!,
        doc: podcast,
        docType: 'podcast',
        author: podcast.owner,
        cid: cid
    }
}