// auth.service.ts
import { Injectable ,BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
// private readonly ORY_API_BASE_URL = 'https://inspiring-liskov-jmmrgchi6n.projects.oryapis.com/';

// async login(data: { username: string, password: string }) {
//   try {
//     const response = await axios.post(`${this.ORY_API_BASE_URL}/login`, data);
//     const { accessToken } = response.data; // Assuming accessToken is returned
//     return { accessToken };
//   } catch (error) {
//     throw new Error('Login failed. Invalid credentials.'); // Handle error appropriately
//   }
// }
// async registerUser(data: { username: string, email: string, password: string }) {
//   try {
//     const response = await axios.post(`${this.ORY_API_BASE_URL}/register`, data);
//     return response.data;
//   } catch (error) {
//     throw new Error('User registration failed.'); // Handle error appropriately
//   }
// }
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(userData: Partial<User>): Promise<User> {
    const newUser = plainToClass(User, userData);
    const errors = await validate(newUser);

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return await this.userRepository.save(newUser);
  }
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (user && user['password'] === password) {
      return user;
    }
    return null;
  }

  async login(user: User): Promise<string> {
    const payload = { email: user.email, sub: user.userUUID };
    return this.jwtService.sign(payload);
  }
  async validateUserById(userUUID: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { userUUID } });
  }
}
