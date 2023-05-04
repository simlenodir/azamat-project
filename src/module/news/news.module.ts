import { Module } from '@nestjs/common';
import { NewsServise } from './news.service';
import { NewsController } from './news.controller';
import { TokenMiddleware } from 'src/middleware/middleware.service';

@Module({
  controllers: [NewsController],
  providers: [NewsServise, TokenMiddleware],
})
export class NewsModule {}
