import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() data: { userName: string }) {
    return this.userService.createUser(data);
  }

  @Get(':userIdx')
  async getUser(@Param('userIdx') userIdx: string) {
    return this.userService.getUser(userIdx);
  }

  @Post('find-or-create')
  async findOrCreateUser(@Body() body: { userName: string }) {
    return this.userService.findOrCreateUser(body.userName);
  }
}
