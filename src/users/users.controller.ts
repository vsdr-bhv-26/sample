import { Body, Controller, Get, Param, Patch, Post,Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
import { ObjectId } from 'mongoose';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':userId')
  async getUser(@Param('userId') userId: ObjectId): Promise<User | any> {
    return await this.usersService.getUserById(userId);
  }

  @Delete(':userId')
  async DeleteOne(@Param('userId') userId:ObjectId):Promise<User>{
    return await this.usersService.deleteUser(userId);
  }

  @Get()
  async getUsers(): Promise<User[]> {
      return await this.usersService.getUsers();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
      return await this.usersService.createUser(createUserDto.email, createUserDto.age)
  }

  @Patch(':userId')
  async updateUser(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
      return await this.usersService.updateUser(userId, updateUserDto);
  }

}
