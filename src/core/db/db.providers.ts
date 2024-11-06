import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE } from '../../constants';
import { databaseConfig } from './db.config';
import { User } from '../../modules/users/entities/user.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      const sequelize = new Sequelize(databaseConfig.development);
      sequelize.addModels([User]);

      try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }

      await sequelize.sync();

      return sequelize;
    },
  },
];
