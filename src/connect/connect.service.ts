import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ConnectService {
  constructor(private prisma: PrismaService) {}

  async createConnect(data: Prisma.ConnectCreateInput) {
    return this.prisma.connect.create({
      data,
    });
  }

  async updateScore(connectIdx: string, score: number) {
    return this.prisma.connect.update({
      where: { connectIdx }, // Updated to use 'connectIdx' field
      data: { score },
    });
  }
}
