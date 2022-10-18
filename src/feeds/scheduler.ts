import * as dotenv from 'dotenv';
import { Queue } from 'bullmq';
import { getNewPodcasts, getPodcasts } from './podcasts';
import { PodcastRecord } from '../models/podcasts';

dotenv.config()
const queueName = process.env.PODCASTS_FEEDS_QUEUE!

const podcastsFeedsQueue = new Queue(queueName, {
  connection: { port: +process.env.REDIS_PORT!, host: process.env.REDIS_HOST!, password: process.env.REDIS_PASSWORD! },
})

const addNewPodcastJobs = async () => {
    const newPodcasts: PodcastRecord[] = await getNewPodcasts()
    const result = await podcastsFeedsQueue.addBulk(newPodcasts.map(p => { return{ name: `NewPodcastJob[ID#${p.id}]`, data: { id: p.id, feed: p.feedUrl, isNew: true } }}))
    console.log('NewPodcastJob jobs added: ', result.length)
}

const addPodcastSyncJobs = async () => {
    const podcasts: PodcastRecord[] = await getPodcasts()
    const result = await podcastsFeedsQueue.addBulk(podcasts.map(p => { return{ name: `PodcastSyncJob[ID#${p.id}]`, data: { id: p.id, feed: p.feedUrl, isNew: false } }}))
    console.log('PodcastSyncJob jobs added: ', result.length)
}

addNewPodcastJobs()
.finally(() => {
    addPodcastSyncJobs()
    .finally(() => { 
        podcastsFeedsQueue.disconnect()
        .finally(() => {
            console.log('Finished scheduling jobs')
        })
    })
});
