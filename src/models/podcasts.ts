import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface PodcastRecord {
  id?: number;
  cid?: string;
  doc?: object;
  feedUrl: string;
  indexedAt?: Date;
  latestAt?: Date;
  active: boolean;
}

export type podcastsPk = "id";
export type podcastsId = podcasts[podcastsPk];
export type podcastsOptionalAttributes = "cid" | "doc" | "indexedAt" | "latestAt";
export type podcastsCreationAttributes = Optional<PodcastRecord, podcastsOptionalAttributes>;

export class podcasts extends Model<PodcastRecord, podcastsCreationAttributes> implements PodcastRecord {
  id!: number;
  cid?: string;
  doc?: object;
  feedUrl!: string;
  indexedAt?: Date;
  latestAt?: Date;
  active!: boolean;


  static initModel(sequelize: Sequelize.Sequelize): typeof podcasts {
    return podcasts.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    cid: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: "podcasts_cid_key"
    },
    doc: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    feedUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "podcasts_feed_url_key",
      field: 'feed_url'
    },
    indexedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'indexed_at'
    },
    latestAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'latest_at'
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'podcasts',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "podcasts_cid_key",
        unique: true,
        fields: [
          { name: "cid" },
        ]
      },
      {
        name: "podcasts_feed_url_key",
        unique: true,
        fields: [
          { name: "feed_url" },
        ]
      },
      {
        name: "podcasts_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
