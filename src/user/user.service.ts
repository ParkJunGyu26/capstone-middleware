import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private prisma: PrismaService) {}

  async createUser(data: { userName: string }) {
    this.logger.log(`Creating user with name: ${data.userName}`);
    const missions = await this.prisma.mission.findMany();
    const newUser = await this.prisma.user.create({
      data: {
        userName: data.userName,
      },
    });

    const connectPromises = missions.map((mission) =>
      this.prisma.connect.create({
        data: {
          userIdx: newUser.userIdx,
          missionIdx: mission.missionIdx,
          score: 0,
          spendTime: 0,
        },
      }),
    );

    await this.prisma.$transaction(connectPromises);
    this.logger.log(
      `Created ${connectPromises.length} connect records for new user ${newUser.userIdx}`,
    );

    return newUser;
  }

  async getUser(userIdx: number) {
    this.logger.log(`Fetching user with ID: ${userIdx}`);
    const user = await this.prisma.user.findUnique({
      where: { userIdx },
    });
    if (!user) {
      this.logger.warn(`User not found with ID: ${userIdx}`);
      return null;
    }
    return { userIdx: user.userIdx, userName: user.userName };
  }

  async findOrCreateUser(userName: string) {
    this.logger.log(`Finding or creating user with name: ${userName}`);
    let user = await this.prisma.user.findUnique({
      where: { userName },
    });

    if (!user) {
      this.logger.log(
        `User not found with name: ${userName}, creating new one.`,
      );
      user = await this.createUser({ userName });
    } else {
      // Check if user has any connect records
      const connects = await this.prisma.connect.findMany({
        where: { userIdx: user.userIdx },
      });
      if (connects.length === 0) {
        this.logger.log(
          `No connect records found for existing user ${user.userIdx}, creating connects.`,
        );
        const missions = await this.prisma.mission.findMany();
        const connectPromises = missions.map((mission) =>
          this.prisma.connect.create({
            data: {
              userIdx: user!.userIdx, // Non-null assertion operator
              missionIdx: mission.missionIdx,
              score: 0,
              spendTime: 0,
            },
          }),
        );
        await this.prisma.$transaction(connectPromises);
      }
    }

    if (user) {
      return { userIdx: user.userIdx, userName: user.userName };
    } else {
      return null;
    }
  }
}
