// src/data-source.ts
import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import { Kyc } from './kyc/kyc.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // never use true in production
  logging: true,
  entities: [User, Kyc],
  migrations: ['fintech/migrations/*.ts'],
});
