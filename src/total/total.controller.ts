import { Controller, Patch, Get, Param, Body } from '@nestjs/common';
import { TotalService } from './total.service';

@Controller('totals')
export class TotalController {
  constructor(private readonly totalService: TotalService) {}

  @Patch(':userIdx')
  async updateTotal(
    @Param('userIdx') userIdx: string,
    @Body() body: { score: number },
  ) {
    console.log(
      `Received request to update total score for user ${userIdx} with score ${body.score}`,
    );
    const result = await this.totalService.updateTotal(userIdx, body.score);
    console.log(`Update result: ${JSON.stringify(result)}`);
    return result;
  }

  @Get(':userIdx/score')
  async getTotalScore(@Param('userIdx') userIdx: string) {
    const result = await this.totalService.getTotalScore(userIdx);
    console.log(`Get total score result: ${JSON.stringify(result)}`);
    return result;
  }
}
