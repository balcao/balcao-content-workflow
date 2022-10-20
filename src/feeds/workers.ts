import * as dotenv from 'dotenv';
import { Worker, Job } from 'bullmq';
import { podcastFeed } from './feed.manager';
import { StorageRequest } from '../interfaces/storage.request.interface';
import slugify from 'slugify';
import { Podcast } from '../interfaces/podcast.interface';
import { episodeToStorageRequest, podcastToStorageRequest } from '../utils/docUtils';
import { addDocToIpfs } from '../storage/ipfs/storageUtils';
import { Episode } from '../interfaces/episode.interface';
import { isWithinAYear, strToDate } from '../utils/dateUtils';
import { EpisodeModel, PodcastModel } from '../models';
import { EpisodeRecord } from '../models/episodes';

dotenv.config()
const queueName = process.env.PODCASTS_FEEDS_QUEUE!

const redisConfiguration = { 
    connection: { 
        port: +process.env.REDIS_PORT!, 
        host: process.env.REDIS_HOST!, 
        password: process.env.REDIS_PASSWORD! 
    } 
}

const processFeed = async (job: Job) => {
    console.log(job)
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
        const latestAt = strToDate(episodes[index].pubDate!)
        const episodeRecords: EpisodeRecord[] = []
        while(index < episodes.length) {
            const episode: Episode = episodes![index]
            if(isWithinAYear(episode.pubDate!)) {
                episode.podcastCid = podcastDoc.cid
                // create episode document
                episode.slug = slugify(episode.title)
                const episodeDoc = await addDocToIpfs(episodeToStorageRequest(episode, podcast.owner!))
                episodeRecords.push({ cid: episodeDoc.cid, doc: episode, podcastCid: podcastDoc.cid })
            } else {
                break
            }
            index++
        }
        if(episodeRecords.length > 0) {
            // update podcast record in DB
            const podcastRecord = await PodcastModel.findByPk(id)
            await podcastRecord?.update({ cid: podcastDoc.cid, doc: podcast, latestAt: latestAt})
            // add episode records in DB
            await EpisodeModel.bulkCreate(episodeRecords)
        }
    } else {

    }
    // update latest_at
}

const worker = new Worker(queueName, processFeed, redisConfiguration)

worker.on('completed', job => {
    console.info(`${job.id} has completed!`);
    });
    
worker.on('failed', (job, err) => {
    console.error(`${job.id} has failed`)// with ${err.message}`);
    });