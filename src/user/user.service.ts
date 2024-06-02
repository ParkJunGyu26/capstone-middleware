import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: { userName: string }) {
    try {
      const userData: Prisma.UserCreateInput = { userName: data.userName };
      const user = await this.prisma.user.create({
        data: userData,
      });
      return { userIdx: user.userIdx, userName: user.userName };
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async getUser(userIdx: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { userIdx },
      });
      if (!user) return null;
      return { userIdx: user.userIdx, userName: user.userName };
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  }

  async findOrCreateUser(userName: string) {
    console.log(`Finding or creating user with name: ${userName}`);
    try {
      let user = await this.prisma.user.findUnique({
        where: { userName },
      });

      if (!user) {
        console.log(`User not found. Creating new user with name: ${userName}`);
        const userData: Prisma.UserCreateInput = { userName };
        user = await this.prisma.user.create({
          data: userData,
        });
      }

      return { userIdx: user.userIdx, userName: user.userName };
    } catch (error) {
      console.error('Error in findOrCreateUser:', error);
      throw error;
    }
  }
}
