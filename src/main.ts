import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  await app.listen(configService.get<number>('PORT'));

  console.log('Server start in port: ' + configService.get<number>('PORT'));
}
bootstrap();
