import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'meetups',
  timestamps: false,
})
export class Meetup extends Model<Meetup> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  datetime: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  location: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  user_id: string;
}
