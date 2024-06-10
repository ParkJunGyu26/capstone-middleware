import {
  Controller,
  Post,
  Patch,
  Get,
  Body,
  Param,
  ParseIntPipe,
  Logger,
} from '@nestjs/common';
import { ConnectService } from './connect.service';

@Controller('connects')
export class ConnectController {
  private readonly logger = new Logger(ConnectController.name);

  constructor(private readonly connectService: ConnectService) {}

  @Post()
  async createConnect(
    @Body()
    data: {
      userIdx: number;
      missionIdx: number;
      score: number;
      spendTime: number;
    },
  ) {
    return this.connectService.createConnect(data);
  }

  @Patch('update-score')
  async updateScore(
    @Body() body: { userIdx: number; missionType: number; score: number },
  ) {
    this.logger.log(`Received updateScore request: ${JSON.stringify(body)}`);
    return this.connectService.updateScore(
      body.userIdx,
      body.missionType,
      body.score,
    );
  }

  @Patch('update-time')
  async updateTime(
    @Body() body: { userIdx: number; missionType: number; spendTime: number },
  ) {
    this.logger.log(`Received updateTime request: ${JSON.stringify(body)}`);
    return this.connectService.updateTime(
      body.userIdx,
      body.missionType,
      body.spendTime,
    );
  }

  @Get(':userIdx/score')
  async getTotalScore(@Param('userIdx', ParseIntPipe) userIdx: number) {
    this.logger.log(`Fetching total score for userIdx: ${userIdx}`);
    return this.connectService.getTotalScore(userIdx);
  }

  @Get(':userIdx/time')
  async getTotalTime(@Param('userIdx', ParseIntPipe) userIdx: number) {
    this.logger.log(`Fetching total time for userIdx: ${userIdx}`);
    return this.connectService.getTotalTime(userIdx);
  }
}
