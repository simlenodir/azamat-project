import { Module } from '@nestjs/common';
import { LecturesService } from './lectures.service';
import { LecturesController } from './lectures.controller';
import { TokenMiddleware } from 'src/middleware/middleware.service';

@Module({
  controllers: [LecturesController],
  providers: [LecturesService, TokenMiddleware]
})
export class LecturesModule {}
