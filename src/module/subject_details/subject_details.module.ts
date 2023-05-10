import { Module } from '@nestjs/common';
import { SubjectDetailsService } from './subject_details.service';
import { SubjectDetailsController } from './subject_details.controller';
import { TokenMiddleware } from 'src/middleware/middleware.service';

@Module({
  controllers: [SubjectDetailsController],
  providers: [SubjectDetailsService, TokenMiddleware]
})
export class SubjectDetailsModule {}
