import { SequelizeModuleOptions } from '@nestjs/sequelize/dist/interfaces/sequelize-options.interface';

export type DatabaseConfig = {
  development: SequelizeModuleOptions;
};
