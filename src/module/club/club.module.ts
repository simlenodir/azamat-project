import { Module } from '@nestjs/common';
import { ClubService } from './club.service';
import { ClubController } from './club.controller';
import { TokenMiddleware } from 'src/middleware/middleware.service';

@Module({
  controllers: [ClubController],
  providers: [ClubService, TokenMiddleware],
})
export class ClubModule {}
