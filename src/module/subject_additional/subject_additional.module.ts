import { Module } from '@nestjs/common';
import { SubjectAdditionalService } from './subject_additional.service';
import { SubjectAdditionalController } from './subject_additional.controller';

@Module({
  controllers: [SubjectAdditionalController],
  providers: [SubjectAdditionalService]
})
export class SubjectAdditionalModule {}
