import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';

import { ConfigModule, ConfigService } from '@nestjs/config';
import {SequelizeModule} from '@nestjs/sequelize';
import configurations from '../../configurations';
import { ModuleRef } from '@nestjs/core';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [configurations],
  }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory:(configService:ConfigService)=>({
        dialect:"postgres",
        host: configService.get('db_host'),
        post: configService.get('db_port'),
        username: configService.get('db_user'),
        password: configService.get('db_password'),
        database: configService.get('db_name'),
        synchronize:true,
        autoLoadModels:true,
        models:[]
      })
    }),
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}