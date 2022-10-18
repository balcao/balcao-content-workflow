const podcastFeedParser = require("podcast-feed-parser")

export const podcastFeed = async (feedUrl: string) => {
    const podcast = await podcastFeedParser.getPodcastFromURL(feedUrl)
    return podcast
}

// podcastFeed('https://feeds.twit.tv/twig.xml').then(p => {
//     console.log('meta: ', p.meta)
//     let now = new Date()
//     console.log('episodes: ', p.episodes.map((e: any) => [e.title, e.pubDate]))
// })