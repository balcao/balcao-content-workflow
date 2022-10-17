import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface Podcast {
  id?: number;
  cid?: string;
  doc?: object;
  feed_url: string;
  // created_at: Date;
  indexed_at?: Date;
  // updated_at: Date;
}

export type podcastsPk = "id";
export type podcastsId = podcasts[podcastsPk];
export type podcastsOptionalAttributes = "cid" | "doc" | "indexed_at";
export type podcastsCreationAttributes = Optional<Podcast, podcastsOptionalAttributes>;

export class podcasts extends Model<Podcast, podcastsCreationAttributes> implements Podcast {
  id!: number;
  cid?: string;
  doc?: object;
  feed_url!: string;
  indexed_at?: Date;


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
    feed_url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "podcasts_feed_url_key"
    },
    indexed_at: {
      type: DataTypes.DATE,
      allowNull: true
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
