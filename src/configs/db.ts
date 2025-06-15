
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../models/User';
import { Task } from '../models/Task';
import log4js from "log4js";
dotenv.config();

const logger = log4js.getLogger();


export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: true, // set to false in production and use migrations instead
  logging: false,
  entities: [User,Task], 
  migrations: ['src/migrations/**/*.ts'],
  subscribers: [],
});

 const connectDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    logger.log('✅ Connected to PostgreSQL via TypeORM');
  } catch (error) {
    logger.error('❌ Error connecting to the database:', error);
    process.exit(1);
  }
};

export default connectDatabase;

