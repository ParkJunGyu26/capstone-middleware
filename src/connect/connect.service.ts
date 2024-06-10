import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ConnectService {
  private readonly logger = new Logger(ConnectService.name);

  constructor(private prisma: PrismaService) {}

  async createConnect(data: {
    userIdx: number;
    missionIdx: number;
    score: number;
    spendTime: number;
  }) {
    return await this.prisma.connect.create({
      data: {
        userIdx: data.userIdx,
        missionIdx: data.missionIdx,
        score: data.score,
        spendTime: data.spendTime,
      },
    });
  }

  async updateScore(userIdx: number, missionType: number, score: number) {
    this.logger.log(
      `Updating score for userIdx: ${userIdx}, missionType: ${missionType}, score: ${score}`,
    );
    const connect = await this.prisma.connect.findFirst({
      where: { userIdx, missionIdx: missionType },
    });

    if (!connect) {
      throw new Error(
        `No connect record found for userIdx: ${userIdx}, missionType: ${missionType}`,
      );
    }

    const updatedConnect = await this.prisma.connect.update({
      where: { connectIdx: connect.connectIdx },
      data: { score },
    });

    this.logger.log(
      `Updated connect record: ${JSON.stringify(updatedConnect)}`,
    );
    return updatedConnect;
  }

  async updateTime(userIdx: number, missionType: number, spendTime: number) {
    this.logger.log(
      `Updating time for userIdx: ${userIdx}, missionType: ${missionType}, spendTime: ${spendTime}`,
    );
    const connect = await this.prisma.connect.findFirst({
      where: { userIdx, missionIdx: missionType },
    });

    if (!connect) {
      throw new Error(
        `No connect record found for userIdx: ${userIdx}, missionType: ${missionType}`,
      );
    }

    const updatedConnect = await this.prisma.connect.update({
      where: { connectIdx: connect.connectIdx },
      data: { spendTime },
    });

    this.logger.log(
      `Updated connect record: ${JSON.stringify(updatedConnect)}`,
    );
    return updatedConnect;
  }

  async getTotalScore(userIdx: number) {
    this.logger.log(`Calculating total score for userIdx: ${userIdx}`);
    const connects = await this.prisma.connect.findMany({
      where: { userIdx },
    });

    const totalScore = connects.reduce(
      (sum, connect) => sum + (connect.score || 0),
      0,
    );
    return { totalScore };
  }

  async getTotalTime(userIdx: number) {
    this.logger.log(`Calculating total time for userIdx: ${userIdx}`);
    const connects = await this.prisma.connect.findMany({
      where: { userIdx },
    });

    const totalTime = connects.reduce(
      (sum, connect) => sum + (connect.spendTime || 0),
      0,
    );
    return { totalTime };
  }
}
