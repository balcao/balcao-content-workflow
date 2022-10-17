import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface Channel {
  id?: number;
  cid?: string;
  doc?: object;
  indexed_at?: Date;
}

export type channelsPk = "id";
export type channelsId = channels[channelsPk];
export type channelsOptionalAttributes = "cid" | "doc" | "indexed_at";
export type channelsCreationAttributes = Optional<Channel, channelsOptionalAttributes>;

export class channels extends Model<Channel, channelsCreationAttributes> implements Channel {
  id!: number;
  cid?: string;
  doc?: object;
  indexed_at?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof channels {
    return channels.init({
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
      unique: "channels_cid_key"
    },
    doc: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    indexed_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
  }, {
    sequelize,
    tableName: 'channels',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "channels_cid_key",
        unique: true,
        fields: [
          { name: "cid" },
        ]
      },
      {
        name: "channels_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
