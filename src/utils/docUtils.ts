import { Account } from "../interfaces/account.interface";
import { Episode } from "../interfaces/episode.interface";
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

export const episodeToStorageRequest = (episode: Episode, owner: Account, cid = ''): StorageRequest => {
    return {
        docName: `${episode.slug}-${episode.pubDate}`,
        doc: episode,
        docType: 'episode',
        author: owner,
        cid: cid
    }
}