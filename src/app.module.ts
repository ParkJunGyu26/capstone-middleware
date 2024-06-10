import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGptService } from './chat-gpt/chat-gpt.service';
import { ConnectModule } from './connect/connect.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ConfigModule을 전역 모듈로 설정
    }),
    ConnectModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGptService, PrismaService],
})
export class AppModule {}
