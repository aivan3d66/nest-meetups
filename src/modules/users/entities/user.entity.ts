// import { DataType, Sequelize } from 'sequelize-typescript';
// import { databaseConfig } from '../../../core/db/db.config';
//
// const sequelize = new Sequelize(databaseConfig.development);
//
// export const User = sequelize.define(
//   'user',
//   {
//     username: {
//       type: DataType.STRING,
//     },
//     email: {
//       type: DataType.STRING,
//       validate: { isEmail: true },
//     },
//     password: {
//       type: DataType.STRING,
//     },
//     roles: {
//       type: DataType.ARRAY(DataType.STRING),
//     },
//   },
//   {
//     timestamps: false,
//   },
// );

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
    type: DataType.ARRAY(DataType.STRING),
    values: ['admin', 'user'],
    allowNull: false,
  })
  roles: string[];
}
