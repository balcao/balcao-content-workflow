import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface PodcastPage {
  id?: number;
  cid?: string;
  doc?: object;
  indexed_at?: Date;
  podcast_cid: string;
}

export type podcasts_pagesPk = "id";
export type podcasts_pagesId = podcasts_pages[podcasts_pagesPk];
export type podcasts_pagesOptionalAttributes = "cid" | "doc" | "indexed_at";
export type podcasts_pagesCreationAttributes = Optional<PodcastPage, podcasts_pagesOptionalAttributes>;

export class podcasts_pages extends Model<PodcastPage, podcasts_pagesCreationAttributes> implements PodcastPage {
  id!: number;
  cid?: string;
  doc?: object;
  indexed_at?: Date;
  podcast_cid!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof podcasts_pages {
    return podcasts_pages.init({
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
      unique: "podcasts_pages_cid_key"
    },
    doc: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    indexed_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    podcast_cid: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'podcasts_pages',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "podcasts_pages_cid_key",
        unique: true,
        fields: [
          { name: "cid" },
        ]
      },
      {
        name: "podcasts_pages_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
