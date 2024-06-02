import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TotalService {
  constructor(private prisma: PrismaService) {}

  async updateTotal(userIdx: string, score: number) {
    console.log(`Updating total score for user ${userIdx} with score ${score}`);

    try {
      const total = await this.prisma.total.findFirst({
        where: { userIdx },
      });

      if (total) {
        console.log(
          `Current total score: ${total.totalScore}. Updating to ${score}`,
        );
        const updatedTotal = await this.prisma.total.update({
          where: { userIdx: total.userIdx }, // 고유 필드 userIdx 사용
          data: { totalScore: score },
        });
        console.log(`Total updated: ${JSON.stringify(updatedTotal)}`);
        return updatedTotal;
      } else {
        console.log(
          `Creating new total score for user ${userIdx} with score ${score}`,
        );
        const newTotal = await this.prisma.total.create({
          data: { userIdx, totalScore: score },
        });
        console.log(`Total created: ${JSON.stringify(newTotal)}`);
        return newTotal;
      }
    } catch (error) {
      console.error(`Failed to update total score for user ${userIdx}:`, error);
      throw error;
    }
  }

  async getTotalScore(userIdx: string) {
    const total = await this.prisma.total.findFirst({
      where: { userIdx },
    });

    console.log('Total fetched: ', total);

    return total ? { totalScore: total.totalScore } : { totalScore: 0 };
  }
}
