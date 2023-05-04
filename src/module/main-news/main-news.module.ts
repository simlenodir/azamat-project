import { Module } from '@nestjs/common';
import { MainNewsService } from './main-news.service';
import { MainNewsController } from './main-news.controller';
import { TokenMiddleware } from 'src/middleware/middleware.service';

@Module({
  controllers: [MainNewsController],
  providers: [MainNewsService, TokenMiddleware],
})
export class MainNewsModule {}
