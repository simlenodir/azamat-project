import { Module } from '@nestjs/common';
import { SubjectLabaratoriesService } from './subject_labaratories.service';
import { SubjectLabaratoriesController } from './subject_labaratories.controller';
import { TokenMiddleware } from 'src/middleware/middleware.service';

@Module({
  controllers: [SubjectLabaratoriesController],
  providers: [SubjectLabaratoriesService, TokenMiddleware]
})
export class SubjectLabaratoriesModule {}
