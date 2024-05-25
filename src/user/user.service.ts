import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: { userName: string }) {
    const userData: Prisma.UserCreateInput = { userName: data.userName };
    return this.prisma.user.create({
      data: userData,
    });
  }

  async getUser(userIdx: string) {
    return this.prisma.user.findUnique({
      where: { userIdx },
    });
  }

  async findOrCreateUser(userName: string) {
    let user = await this.prisma.user.findUnique({
      where: { userName },
    });

    if (!user) {
      const userData: Prisma.UserCreateInput = { userName };
      user = await this.prisma.user.create({
        data: userData,
      });
    }

    return user;
  }
}
