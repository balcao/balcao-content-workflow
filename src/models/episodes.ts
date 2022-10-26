import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface EpisodeRecord {
  id?: number;
  cid?: string;
  doc?: object;
  indexedAt?: Date;
  podcastCid: string;
  pubDate?: Date;
}

export type episodesPk = "id";
export type episodesId = episodes[episodesPk];
export type episodesOptionalAttributes = "cid" | "doc" | "indexedAt" | "pubDate";
export type episodesCreationAttributes = Optional<EpisodeRecord, episodesOptionalAttributes>;

export class episodes extends Model<EpisodeRecord, episodesCreationAttributes> implements EpisodeRecord {
  id!: number;
  cid?: string;
  doc?: object;
  indexedAt?: Date;
  podcastCid!: string;
  pubDate?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof episodes {
    return episodes.init({
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
      unique: "episodes_cid_key"
    },
    doc: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    indexedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'indexed_at'
    },
    podcastCid: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'podcast_cid'
    },
    pubDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'pub_date'
    }
  }, {
    sequelize,
    tableName: 'episodes',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "episodes_cid_key",
        unique: true,
        fields: [
          { name: "cid" },
        ]
      },
      {
        name: "episodes_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
