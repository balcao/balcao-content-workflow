import * as dotenv from 'dotenv';
import { Worker, Job } from 'bullmq';
import { podcastFeed } from './feed.manager';
import { StorageRequest } from '../interfaces/storage.request.interface';
import slugify from 'slugify';
import { Podcast } from '../interfaces/podcast.interface';
import { episodeToStorageRequest, podcastToStorageRequest } from '../utils/docUtils';
import { addDocToIpfs } from '../storage/ipfs/storageUtils';
import { Episode } from '../interfaces/episode.interface';
import { isWithinAYear } from '../utils/dateUtils';
import { PodcastModel } from '../models';

dotenv.config()
const queueName = process.env.PODCASTS_FEEDS_QUEUE!

const startWorkers = async() => {
    const worker = new Worker(queueName, async (job: Job) => {
        //await job.updateProgress(42);
        const { id, feed, isNew } = job.data
        // fetch podcast feed
        const feedObj = await podcastFeed(feed)
        const podcast: Podcast = feedObj.meta
        const episodes: Episode[] = feedObj.episodes
        podcast.slug = slugify(podcast.title)
        if(isNew) {
            // create podcast document
            const podcastDoc = await addDocToIpfs(podcastToStorageRequest(podcast))
            // create episode documents
            let index = 0
            const latestAt = episodes[index]?.pubDate
            while(index < episodes.length) {
                const episode: Episode = episodes![index]
                if(isWithinAYear(episode.pubDate!)) {
                    episode.podcastCid = podcastDoc.cid
                    // create episode document
                    const episodeDoc = await addDocToIpfs(episodeToStorageRequest(episode, podcast.owner!))
                } else {
                    break
                }
                index++
            }
            if(latestAt) {
                // update podcast record in DB
                const podcastRecord = await PodcastModel.findByPk(id)
                podcastRecord?.update({ cid: podcastDoc.cid, doc: podcast, latest_at: latestAt})
                // add podcast_page records in DB
            }
        } else {

        }
        // update latest_at
    })
    worker.run()
}


// podcast.episodes = podcast.episodes.filter((ep: any) => isWithinAYear(ep.pubDate))