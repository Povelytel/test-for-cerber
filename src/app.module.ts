import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        ETH_RPC: Joi.string().required(),
      }),
      envFilePath: './.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
