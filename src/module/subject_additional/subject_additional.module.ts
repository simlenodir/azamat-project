import { Module } from '@nestjs/common';
import { SubjectAdditionalService } from './subject_additional.service';
import { SubjectAdditionalController } from './subject_additional.controller';
import { TokenMiddleware } from 'src/middleware/middleware.service';

@Module({
  controllers: [SubjectAdditionalController],
  providers: [SubjectAdditionalService, TokenMiddleware]
})
export class SubjectAdditionalModule {}
