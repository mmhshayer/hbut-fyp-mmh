import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';

import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from '../config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(getMongoConfig()),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
