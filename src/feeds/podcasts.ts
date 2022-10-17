import { PodcastModel } from "../models";

const fetchPodcasts = async () => {
    return await PodcastModel.findAll()
}

const createPodcast = async () => {
    return await PodcastModel.create({ cid: '121212121', feed_url: 'sasas', doc: { podcast: 'Cool'}})
}

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

updatePodcast().then(result => {
    console.log('Result: ', result)
})

console.log('Finished fetching all podcasts')