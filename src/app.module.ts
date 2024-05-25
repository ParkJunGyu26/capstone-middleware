import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGptService } from './chat-gpt/chat-gpt.service';
import { ScoreService } from './score/score.service';
import { ScoreController } from './score/score.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController, ScoreController],
  providers: [AppService, ChatGptService, ScoreService],
})
export class AppModule {}
