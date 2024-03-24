import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'nestjs와 roblox 연동 성공!';
  }
}
