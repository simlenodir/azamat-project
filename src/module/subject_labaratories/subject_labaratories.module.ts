import { Module } from '@nestjs/common';
import { SubjectLabaratoriesService } from './subject_labaratories.service';
import { SubjectLabaratoriesController } from './subject_labaratories.controller';

@Module({
  controllers: [SubjectLabaratoriesController],
  providers: [SubjectLabaratoriesService]
})
export class SubjectLabaratoriesModule {}
