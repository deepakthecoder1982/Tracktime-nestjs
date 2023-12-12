import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config(); // Load environment variables from .env file

// console.log(process.env.DB_USERNAME )
// console.log(process.env.DB_PASSWORD )
// console.log(process.env.DB_DATABASE )
// console.log(process.env.DB_PORT )
// console.log(process.env.DB_HOST)
// console.log(process.env.MYSQL_ATTR_SSL_CA)

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'tracktime_db',
  entities: [join(__dirname, '/**/*.entity{.ts,.js}')], 
  synchronize: process.env.NODE_ENV !== 'production', // Set to false in production
  ssl: false, // Disable SSL
};

export default typeOrmConfig;



// This below code is for connecting to the planetScale DB 

// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import * as dotenv from 'dotenv';

// dotenv.config();

// const dbUrl = process.env.DATABASE_URL;

// if (!dbUrl) {
//   throw new Error('DATABASE_URL is not provided in the environment variables');
// }

// const typeOrmConfig: TypeOrmModuleOptions = {
//   type: 'mysql',
//   url: dbUrl,
//   extra: {
//     ssl: {
//       rejectUnauthorized: true,
//     },
//   },
//   entities: [__dirname + '/**/*.entity{.ts,.js}'],
//   synchronize: process.env.NODE_ENV !== 'production',
// };

// export default typeOrmConfig;
