import * as dotenv from 'dotenv';
import { Worker, Job } from 'bullmq';
import { podcastFeed } from './feed.manager';
import slugify from 'slugify';
import { Podcast } from '../interfaces/podcast.interface';
import { episodeToStorageRequest, podcastToStorageRequest } from '../utils/docUtils';
import { addDocToIpfs } from '../storage/ipfs/storageUtils';
import { Episode } from '../interfaces/episode.interface';
import { oneYearAgo, strToDate } from '../utils/dateUtils';
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
    console.log(`Processing job #${job.id}`)
    //await job.updateProgress(42);
    const { id, feed, isNew } = job.data
    // fetch podcast feed
    const feedObj = await podcastFeed(feed)
    const podcast: Podcast = feedObj.meta
    const episodes: Episode[] = feedObj.episodes
    podcast.slug = slugify(podcast.title)
    const podcastRecord = await PodcastModel.findByPk(id)
    // fetch the last saved episode's pubDate
    // or set it to a year ago
    const lastSavedEpPubDate = podcastRecord?.latestAt || oneYearAgo()
    // init podcast document
    const podcastDoc = isNew ? await addDocToIpfs(podcastToStorageRequest(podcast))
        : { cid: podcastRecord?.cid! }
    if(!podcastDoc) {
        throw `Unable to fetch/generate Podcast CID for #${id} | ${feed}`
    }
    // create episode documents
    let index = 0
    const newLatestAt = strToDate(episodes[index].pubDate!)
    const episodeRecords: EpisodeRecord[] = []
    while(index < episodes.length) {
        const episode: Episode = episodes![index]
        const pubDate = strToDate(episode.pubDate)
        // only episodes not more than a year old and not already processed
        // or later that the last saved episode
        if(pubDate > lastSavedEpPubDate) {
            episode.podcastCid = podcastDoc.cid
            // create episode document
            episode.slug = slugify(episode.title)
            const episodeDoc = await addDocToIpfs(episodeToStorageRequest(episode, podcast.owner!))
            episodeRecords.push({ cid: episodeDoc.cid, doc: episode, podcastCid: podcastDoc.cid, pubDate: pubDate })
        } else {
            break
        }
        index++
    }
    // Persist processed results in the DB
    if(episodeRecords.length > 0) {
        // update podcast record in DB
        await podcastRecord?.update({ cid: podcastDoc.cid, doc: podcast, latestAt: newLatestAt})
        // add episode records in DB
        await EpisodeModel.bulkCreate(episodeRecords)
    }
    const result = `Finished processing Podcast #${id} | ${feed} | newLatestAt: ${newLatestAt} | Episodes processed: ${episodeRecords.length}`
    console.info(result)
    return result
}

const worker = new Worker(queueName, processFeed, redisConfiguration)

worker.on('completed', job => {
    console.info(`${job.id} has completed!`)
    });
    
worker.on('failed', (job, err) => {
    // truncating error message to length 100, view full error logs on the BullMQ Dashboard
    console.error(`${job.id} has failed with ${err.message.slice(0, 100)}`)
    });