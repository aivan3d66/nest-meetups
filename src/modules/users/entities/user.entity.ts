import { DataType, Sequelize } from 'sequelize-typescript';
import { databaseConfig } from '../../../core/db/db.config';

const sequelize = new Sequelize(databaseConfig.development);

export const User = sequelize.define(
  'user',
  {
    username: {
      type: DataType.STRING,
    },
    email: {
      type: DataType.STRING,
      validate: { isEmail: true },
    },
    password: {
      type: DataType.STRING,
    },
    roles: {
      type: DataType.ARRAY(DataType.STRING),
    },
  },
  {
    timestamps: false,
  },
);
