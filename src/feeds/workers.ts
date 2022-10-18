import * as dotenv from 'dotenv';
import { Worker, Job } from 'bullmq';
import { podcastFeed } from './feed.manager';
import { StorageRequest } from '../interfaces/storage.request.interface';
import slugify from 'slugify';
import { Podcast } from '../interfaces/podcast.interface';
import { podcastToStorageRequest } from '../utils/docUtils';
import { addDocToIpfs } from '../storage/ipfs/storageUtils';

dotenv.config()
const queueName = process.env.PODCASTS_FEEDS_QUEUE!

const startWorkers = async() => {
    const worker = new Worker(queueName, async (job: Job) => {
        //await job.updateProgress(42);
        const { id, feed, isNew } = job.data
        // fetch podcast feed
        const podcast: Podcast = await podcastFeed(feed)
        podcast.slug = slugify(podcast.title)
        if(isNew) {
            // create podcast document
            await addDocToIpfs(podcastToStorageRequest(podcast))
            // update podcast record in DB
            // create episode documents
            // add podcast_page records in DB
        } else {

        }
        // update latest_at
    })
    worker.run()
}


// podcast.episodes = podcast.episodes.filter((ep: any) => isWithinAYear(ep.pubDate))