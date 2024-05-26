import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TotalService {
  constructor(private prisma: PrismaService) {}

  async updateTotal(userIdx: string, score: number) {
    console.log(`Updating total score for user ${userIdx} with score ${score}`);

    try {
      const total = await this.prisma.total.findUnique({
        where: { userIdx },
      });

      if (total) {
        console.log(
          `Current total score: ${total.totalScore}. Updating to ${score}`,
        );
        return this.prisma.total.update({
          where: { userIdx },
          data: { totalScore: score },
        });
      } else {
        console.log(
          `Creating new total score for user ${userIdx} with score ${score}`,
        );
        return this.prisma.total.create({
          data: { userIdx, totalScore: score },
        });
      }
    } catch (error) {
      console.error(`Failed to update total score for user ${userIdx}:`, error);
      throw error;
    }
  }

  async getTotalScore(userIdx: string) {
    const total = await this.prisma.total.findUnique({
      where: { userIdx },
    });

    console.log('total : ', total);

    return total ? { totalScore: total.totalScore } : { totalScore: 0 };
  }
}
