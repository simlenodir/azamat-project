import { Module } from '@nestjs/common';
import { SubjectInfoService } from './subject_info.service';
import { SubjectInfoController } from './subject_info.controller';

@Module({
  controllers: [SubjectInfoController],
  providers: [SubjectInfoService]
})
export class SubjectInfoModule {}
