import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGptService } from './chat-gpt/chat-gpt.service';
import { ConnectModule } from './connect/connect.module';
import { UserModule } from './user/user.module';
import { TotalModule } from './total/total.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ConnectModule,
    UserModule,
    TotalModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGptService],
})
export class AppModule {}
