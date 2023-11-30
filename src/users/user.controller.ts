// user.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Res,
  Req,
  Patch,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackTimeStatus, User } from './user.entity';
import { Repository } from 'typeorm';
import axios from 'axios'; // For making HTTP requests

@Controller('auth')
export class UserController {
  constructor(private readonly userService: AuthService) {}

  @Post('register')
  async registerUser(
    @Body() userData: Partial<User>,
    @Res() res,
  ): Promise<any> {
    const isAdmin = userData.isAdmin !== undefined ? userData.isAdmin : false;

    try {
      // Default config for new users
      const defaultConfig = {
        trackTimeStatus: TrackTimeStatus.Resume,
        // Add other config properties as needed
      };

      const newUser = await this.userService.registerUser({
        ...userData,
        isAdmin,
        config: defaultConfig,
      });
      console.log(newUser);

      res.set('user-id', newUser.userUUID);
      return res
        .status(200)
        .json({ message: 'User registered successfully', user: newUser });
      // return { message: 'User registered successfully', user: newUser };
    } catch (error) {
      return res.status(500).json({ message: 'Failed to register user',"error":error?.response?.message});
    }
  }
  @Get('/api/config')
  async getConfig(@Req() req, @Res() res): Promise<any> {
    const userId = req.headers['user-id']; // Extract user ID from headers

    try {
      // Retrieve user config and track time status based on user ID
      const userConfig = await this.userService.getUserConfig(userId);

      if (!userConfig) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Construct response with user's config and track time status
      const response = {
        config: {
          trackTimeStatus: userConfig.trackTimeStatus,
          // Other user-specific config details here
        },
      };

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch user config' });
    }
  }
  @Patch('update-track-status')
  async updateTrackStatus(
    @Req() req,
    @Res() res,
    @Body() updateData: { TrackTimeStatus; userId },
    // @Param('userId') userId: string,
  ): Promise<any> {
    // Check if the requesting user is an admin
    const adminId = req.headers['user-id'];
    const requestingUser = await this.userService.validateUserById(adminId);
    if (!requestingUser?.isAdmin) {
      return res
        .status(403)
        .json({
          message: 'Unauthorized: Only admin can update track time status',
        });
    }

    try {
      const userToUpdate = await this.userService.validateUserById(
        updateData.userId,
      );
      if (!userToUpdate) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Update trackTimeStatus for the user
      userToUpdate.config = {
        ...userToUpdate.config,
        trackTimeStatus: updateData.TrackTimeStatus,
      };
      console.log(userToUpdate);

      await this.userService.save(userToUpdate);
      return res
        .status(200)
        .json({ message: 'Track time status updated successfully' });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Failed to update track time status' });
    }
  }
  @Post('create-admin')
  async createAdmin(@Body() adminData: Partial<User>): Promise<any> {
    try {
      const adminUser = await this.userService.createAdminUser(adminData);
      return { message: 'Admin user created successfully', user: adminUser };
    } catch (error) {
      return { message: 'Failed to create admin user' };
    }
  }


  @Post('login')
  async login(
    @Body() loginData: { email: string; password: string },
    @Res() res,
  ) {
    const user = await this.userService.validateUser(
      loginData.email,
      loginData.password,
    );
    if (!user) {
      return res.status(500).json({ message: 'Invalid credentials' });
    }
    res.set('user-id', user?.userUUID);
    const token = await this.userService.login(user);
    return res.status(200).json({msg: 'Login Succesfully!!', access_token: token });
  }
}
