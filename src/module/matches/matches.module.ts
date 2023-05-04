import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { TokenMiddleware } from 'src/middleware/middleware.service';

@Module({
  controllers: [MatchesController],
  providers: [MatchesService, TokenMiddleware],
})
export class MatchesModule {}
