import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { channels as _channels } from "./channels";
import type { Channel, channelsCreationAttributes } from "./channels";
import { podcasts as _podcasts } from "./podcasts";
import type { Podcast, podcastsCreationAttributes } from "./podcasts";
import { podcasts_pages as _podcasts_pages } from "./podcasts_pages";
import type { PodcastPage, podcasts_pagesCreationAttributes } from "./podcasts_pages";
import { stories as _stories } from "./stories";
import type { Story, storiesCreationAttributes } from "./stories";
import { topics as _topics } from "./topics";
import type { Topic, topicsCreationAttributes } from "./topics";

dotenv.config();

const sequelize = new Sequelize(process.env.DB_CONNECTION_URL!);

// export {
//   _channels as channels,
//   _podcasts as podcasts,
//   _podcasts_pages as podcasts_pages,
//   _stories as stories,
//   _topics as topics,
// };

export type {
  Channel as Channel,
  // channelsCreationAttributes,
  Podcast as podcastsAttributes,
  // podcastsCreationAttributes,
  PodcastPage as podcasts_pagesAttributes,
  // podcasts_pagesCreationAttributes,
  Story as storiesAttributes,
  // storiesCreationAttributes,
  Topic as topicsAttributes,
  // topicsCreationAttributes,
};

// export function initModels(sequelize: Sequelize) {
//   const Channel = _channels.initModel(sequelize);
//   const Podcast = _podcasts.initModel(sequelize);
//   const PodcastPage = _podcasts_pages.initModel(sequelize);
//   const Story = _stories.initModel(sequelize);
//   const Topic = _topics.initModel(sequelize);


//   return {
//     channels: channels,
//     podcasts: podcasts,
//     podcasts_pages: podcasts_pages,
//     stories: stories,
//     topics: topics,
//   };
// }

export const ChannelModel = _channels.initModel(sequelize);_channels.initModel(sequelize);
export const PodcastModel = _podcasts.initModel(sequelize);
export const PodcastPageModel = _podcasts_pages.initModel(sequelize);
export const StoryModel = _stories.initModel(sequelize);
export const TopicModel = _topics.initModel(sequelize);
