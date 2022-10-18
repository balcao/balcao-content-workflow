import { PodcastModel } from "../models";
import { Op } from 'sequelize';

const fetchPodcasts = async () => {
    return await PodcastModel.findAll()
}

// const createPodcast = async () => {
//     return await PodcastModel.create({ cid: '121212121', feed_url: 'sasas', doc: { podcast: 'Cool'}})
// }

const updatePodcast = async () => {
    // await PodcastModel.update(1, )
    const podcast = await PodcastModel.findByPk(1)
    console.log('Podcast: ', podcast)
    const result = await podcast?.update({ cid: '33333333'})
    // console.log('result [u]: ', result)
    return result
}

// createPodcast().then(result => {
//     console.log('Result: ', result)
//     fetchPodcasts().then(podcasts => {
//         console.log('All podcasts: ', podcasts)
//     })
// })

console.log('Finished fetching all podcasts')

export const getNewPodcasts = async () => {
    const newPodcasts = await PodcastModel.findAll({
        where: {
            latest_at: {
                [Op.is]: undefined
            }
        }
    })

    return newPodcasts;
}

export const getPodcasts = async () => {
    const podcasts = await PodcastModel.findAll({
        where: {
            latest_at: {
                [Op.not]: undefined
            }
        }
    })

    return podcasts;
}