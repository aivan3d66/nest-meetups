import { Sequelize } from 'sequelize-typescript';
import { User } from '../../modules/users/entities/user.entity';
import { databaseConfig } from './db.config';
import { SEQUELIZE } from '../constants';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      const sequelize = new Sequelize(...databaseConfig.development);
      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
