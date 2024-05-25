import { Controller, Post, Patch, Body, Param } from '@nestjs/common';
import { ConnectService } from './connect.service';
import { Prisma } from '@prisma/client';

@Controller('connects')
export class ConnectController {
  constructor(private readonly connectService: ConnectService) {}

  @Post()
  async createConnect(@Body() data: Prisma.ConnectCreateInput) {
    return this.connectService.createConnect(data);
  }

  @Patch(':connectIdx/score')
  async updateScore(
    @Param('connectIdx') connectIdx: string,
    @Body() body: { score: number },
  ) {
    return this.connectService.updateScore(connectIdx, body.score);
  }
}
