import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config(); // Load environment variables from .env file

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'tracktime_db',
  entities: [join(__dirname, '/**/*.entity{.ts,.js}')],
  ssl: {
    ca: process.env.MYSQL_ATTR_SSL_CA || '', // Path to SSL CA file
  },
  synchronize: process.env.NODE_ENV !== 'production', // Set to false in production
};

export default typeOrmConfig;

