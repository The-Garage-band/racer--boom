import {AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table} from "sequelize-typescript";
import type {NonAttribute} from "sequelize";
import {ForumMessage} from "./ForumMessage";

@Table({
  tableName: 'forum_theme',
  timestamps: true,
  createdAt: 'creationDate',
  updatedAt: false
})
export class ForumTheme extends Model<ForumTheme> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  public override id: number | undefined;

  @Column(DataType.TEXT)
  public name: string | undefined;

  @Column(DataType.INTEGER)
  public creationUser: number | undefined;

  @HasMany(() => ForumMessage)
  public messages: ForumMessage[] | undefined;

  declare getMessages: NonAttribute<() => Promise<ForumMessage[]>>;
}