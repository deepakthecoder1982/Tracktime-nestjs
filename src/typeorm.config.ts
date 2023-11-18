import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost', // Replace with your database host
  port: 3306, // Replace with your database port
  username: 'root', // Replace with your database username
  password: '', // Replace with your database password
  database: 'tracktime_db', // Replace with your database name
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true, // Set to false in production
};

export default typeOrmConfig;
