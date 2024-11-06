import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE } from '../../constants';
import { databaseConfig } from './db.config';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      const sequelize = new Sequelize(databaseConfig.development);

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
