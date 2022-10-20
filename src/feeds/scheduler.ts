import * as dotenv from 'dotenv';
import { Queue } from 'bullmq';
import { getAllPodcasts } from './podcasts';
import { PodcastRecord } from '../models/podcasts';

dotenv.config()
const queueName = process.env.PODCASTS_FEEDS_QUEUE!

const podcastsFeedsQueue = new Queue(queueName, {
  connection: { port: +process.env.REDIS_PORT!, host: process.env.REDIS_HOST!, password: process.env.REDIS_PASSWORD! },
})

const addPodcastSyncJobs = async () => {
    const podcasts: PodcastRecord[] = await getAllPodcasts()
    const result = await podcastsFeedsQueue.addBulk(podcasts.map(p => { 
        return{ name: `PodcastSyncJob[PodcastID#${p.id}]`, data: { id: p.id, feed: p.feedUrl, isNew: !p.latestAt } }
    }))
    console.log('PodcastSyncJob jobs added: ', result.length)
}

addPodcastSyncJobs()
.finally(() => {
    podcastsFeedsQueue.disconnect()
        .finally(() => {
            console.log('Finished scheduling jobs')
        })
});
