import * as dotenv from 'dotenv';

import { DatabaseConfig } from './db.interface';

dotenv.config();

const { DB_PORT, DB_USER, DB_PASS, DB_NAME, DB_HOST } = process.env;

export const databaseConfig: DatabaseConfig = {
  development: {
    dialect: 'postgres',
    username: DB_USER || '',
    password: DB_PASS || '',
    database: DB_NAME || '',
    host: DB_HOST || 'localhost',
    port: Number(DB_PORT) || 5432,
  },
};
