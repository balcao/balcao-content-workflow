import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface Story {
  id?: number;
  cid?: string;
  doc?: object;
  indexed_at?: Date;
  channel_cid: string;
  topic_cid: string;
}

export type storiesPk = "id";
export type storiesId = stories[storiesPk];
export type storiesOptionalAttributes = "cid" | "doc" | "indexed_at";
export type storiesCreationAttributes = Optional<Story, storiesOptionalAttributes>;

export class stories extends Model<Story, storiesCreationAttributes> implements Story {
  id!: number;
  cid?: string;
  doc?: object;
  indexed_at?: Date;
  channel_cid!: string;
  topic_cid!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof stories {
    return stories.init({
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
      unique: "stories_cid_key"
    },
    doc: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    indexed_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    channel_cid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    topic_cid: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'stories',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "stories_cid_key",
        unique: true,
        fields: [
          { name: "cid" },
        ]
      },
      {
        name: "stories_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
