// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UserController } from './users/user.controller';
import { AuthService } from './users/auth.service';
import typeOrmConfig from './typeOrm.config';
import { JwtModule } from '@nestjs/jwt';
import { ProfileController } from './userProfile/userProfile.controller';
import { JwtStrategy } from './jwt.strategy';

// {
//   type: 'mysql',
//   host: 'localhost',
//   port: 3306,
//   username: 'root',
//   password: '',
//   database: 'tracktime_db',
//   entities: ['dist/**/*.entity{.ts,.js}'],
//   synchronize: true,
// }
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([User]), 
    JwtModule.register({
      secret: 'crazy-secret',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers:[UserController,ProfileController],
  providers:[AuthService,JwtStrategy]
})
export class AppModule {}
