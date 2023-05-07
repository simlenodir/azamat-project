import { Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import { TokenMiddleware } from 'src/middleware/middleware.service';

@Module({
  controllers: [EducationController],
  providers: [EducationService, TokenMiddleware]
})
export class EducationModule {}
