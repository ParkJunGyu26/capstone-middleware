import { Module } from '@nestjs/common';
import { ConnectService } from './connect.service';
import { ConnectController } from './connect.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ConnectController],
  providers: [ConnectService, PrismaService],
})
export class ConnectModule {}
