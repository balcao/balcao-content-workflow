import { Episode } from "../interfaces/episode.interface"
import { EpisodeModel } from "../models"
import { EpisodeRecord } from "../models/episodes"
import { strToDate } from "./dateUtils"

const setPubDate = async () => {
    const episodes = await EpisodeModel.findAll()
    episodes.forEach(async (ep) => {
        const episode: any = ep?.doc
        await ep.update({ pubDate: strToDate(episode.pubDate)})
    })
}

setPubDate().then(_ => {
    console.log('Done')
})