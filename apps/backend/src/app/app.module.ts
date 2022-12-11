import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';

import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from '../config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/authT.guard';
import { APP_GUARD } from '@nestjs/core';
import { CompanyModule } from './company/';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(getMongoConfig()),
    AuthModule,
    UsersModule,
    CompanyModule,
    ProductsModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AppService,
  ],
})
export class AppModule {}
