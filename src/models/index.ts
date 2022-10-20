import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { channels as _channels } from "./channels";
import type { ChannelRecord, channelsCreationAttributes } from "./channels";
import { podcasts as _podcasts } from "./podcasts";
import type { PodcastRecord, podcastsCreationAttributes } from "./podcasts";
import { episodes as _episodes } from "./episodes";
import type { EpisodeRecord, episodesCreationAttributes } from "./episodes";
import { stories as _stories } from "./stories";
import type { StoryRecord, storiesCreationAttributes } from "./stories";
import { topics as _topics } from "./topics";
import type { TopicRecord, topicsCreationAttributes } from "./topics";

dotenv.config();

const sequelize = new Sequelize(process.env.DB_CONNECTION_URL!);

// export {
//   _channels as channels,
//   _podcasts as podcasts,
//   _episodes as episodes,
//   _stories as stories,
//   _topics as topics,
// };

export type {
  ChannelRecord as Channel,
  // channelsCreationAttributes,
  PodcastRecord as podcastsAttributes,
  // podcastsCreationAttributes,
  EpisodeRecord as episodesAttributes,
  // episodesCreationAttributes,
  StoryRecord as storiesAttributes,
  // storiesCreationAttributes,
  TopicRecord as topicsAttributes,
  // topicsCreationAttributes,
};

// export function initModels(sequelize: Sequelize) {
//   const Channel = _channels.initModel(sequelize);
//   const Podcast = _podcasts.initModel(sequelize);
//   const Episode = _episodes.initModel(sequelize);
//   const Story = _stories.initModel(sequelize);
//   const Topic = _topics.initModel(sequelize);


//   return {
//     channels: channels,
//     podcasts: podcasts,
//     episodes: episodes,
//     stories: stories,
//     topics: topics,
//   };
// }

export const ChannelModel = _channels.initModel(sequelize);_channels.initModel(sequelize);
export const PodcastModel = _podcasts.initModel(sequelize);
export const EpisodeModel = _episodes.initModel(sequelize);
export const StoryModel = _stories.initModel(sequelize);
export const TopicModel = _topics.initModel(sequelize);
