// user.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Controller('auth')
export class UserController {
  // constructor(private readonly authService: AuthService) {}

  // @Post('login')
  // async login(@Body() loginData: { username: string, password: string }) {
  //   return this.authService.login(loginData);
  // }
  // @Post('register')
  // async register(@Body() registerData: { username: string, password: string }) {
  //   return this.authService.registerUser(registerData);
  // }
  constructor(private readonly userService: AuthService) {}

  @Post('register')
  async registerUser(@Body() userData: Partial<User>) {
    const newUser = await this.userService.registerUser(userData);
    return { message: 'User registered successfully', user: newUser };
  }
  @Post('login')
  async login(@Body() loginData: { email: string; password: string }) {
    const user = await this.userService.validateUser(
      loginData.email,
      loginData.password,
    );
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    const token = await this.userService.login(user);
    return { access_token: token };
  }
}
