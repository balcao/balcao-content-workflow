import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface Topic {
  id?: number;
  cid?: string;
  doc?: object;
  indexed_at?: Date;
}

export type topicsPk = "id";
export type topicsId = topics[topicsPk];
export type topicsOptionalAttributes = "cid" | "doc" | "indexed_at";
export type topicsCreationAttributes = Optional<Topic, topicsOptionalAttributes>;

export class topics extends Model<Topic, topicsCreationAttributes> implements Topic {
  id!: number;
  cid?: string;
  doc?: object;
  indexed_at?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof topics {
    return topics.init({
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
      unique: "topics_cid_key"
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
    tableName: 'topics',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "topics_cid_key",
        unique: true,
        fields: [
          { name: "cid" },
        ]
      },
      {
        name: "topics_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
