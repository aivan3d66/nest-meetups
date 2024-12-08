import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'users',
  timestamps: false,
})
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;
  @Column({
    type: DataType.STRING,
    validate: { isEmail: true },
    allowNull: false,
  })
  email: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  refresh_token: string;
  @Column({
    type: DataType.ARRAY(DataType.STRING),
    values: ['admin', 'user'],
    allowNull: false,
  })
  roles: string[];
}
