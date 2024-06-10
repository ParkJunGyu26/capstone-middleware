import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  ParseIntPipe,
  Logger,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() data: { userName: string }) {
    this.logger.log(`Creating user with data: ${JSON.stringify(data)}`);
    return this.userService.createUser(data);
  }

  @Get(':userIdx')
  async getUser(@Param('userIdx', ParseIntPipe) userIdx: number) {
    this.logger.log(`Fetching user with ID: ${userIdx}`);
    return this.userService.getUser(userIdx);
  }

  @Post('find-or-create')
  async findOrCreateUser(@Body() body: { userName: string }) {
    this.logger.log(`Finding or creating user with name: ${body.userName}`);
    return this.userService.findOrCreateUser(body.userName);
  }
}
