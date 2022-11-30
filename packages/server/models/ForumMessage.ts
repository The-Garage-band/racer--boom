import {Table, Model, AutoIncrement, PrimaryKey, Column, DataType, ForeignKey, BelongsTo} from "sequelize-typescript";
import {ForumTheme} from "./ForumTheme";

@Table({
  tableName: 'forum_message',
  timestamps: true,
  createdAt: 'creationDate',
  updatedAt: false
})
export class ForumMessage extends Model<ForumMessage> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  public override id: number | undefined;

  @ForeignKey(() => ForumTheme)
  @Column(DataType.INTEGER)
  public theme_id: number | undefined;

  @BelongsTo(() => ForumTheme)
  public theme: ForumTheme | undefined;

  @Column(DataType.TEXT)
  public userName: string | undefined;

  @Column(DataType.TEXT)
  public text: string | undefined;
}