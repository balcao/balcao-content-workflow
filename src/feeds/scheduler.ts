import * as dotenv from 'dotenv';
import { Queue } from 'bullmq';

dotenv.config();

const SERVER_PORT = 3002;

const podcastsFeedsQueue = new Queue('PodcastsFeedsQueue', {
  connection: { port: +process.env.REDIS_PORT!, host: process.env.REDIS_HOST!, password: process.env.REDIS_PASSWORD! },
})

const addJob = async () => {
    const result = await podcastsFeedsQueue.add('job01', { id: 1, description: 'Cool Job', params: { x: 1000, y: 'job1' } })
    console.log('Job added: ', result)
}

addJob().finally(() => { podcastsFeedsQueue.disconnect() });
console.log('Finish scheduling jobs')
