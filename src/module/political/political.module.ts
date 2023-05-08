import { Module } from '@nestjs/common';
import { PoliticalService } from './political.service';
import { PoliticalController } from './political.controller';
import { TokenMiddleware } from 'src/middleware/middleware.service';

@Module({
  controllers: [PoliticalController],
  providers: [PoliticalService, TokenMiddleware]
})
export class PoliticalModule {}
