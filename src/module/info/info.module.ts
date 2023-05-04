import { Module } from '@nestjs/common';
import { InfoService } from './info.service';
import { InfoController } from './info.controller';
import { TokenMiddleware } from 'src/middleware/middleware.service';

@Module({
  controllers: [InfoController],
  providers: [InfoService, TokenMiddleware]
})
export class InfoModule {}
