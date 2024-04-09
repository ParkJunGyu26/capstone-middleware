import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 설정 활성화
  app.enableCors({
    origin: '*', // 모든 출처 허용 (보안상 위험할 수 있으므로, 실제 배포시에는 지정된 출처만 허용하도록 설정)
    allowedHeaders: 'Content-Type',
  });

  await app.listen(3000);
}
bootstrap();
