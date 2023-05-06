import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { TokenMiddleware } from 'src/middleware/middleware.service';

@Module({
  controllers: [SubjectsController],
  providers: [SubjectsService, TokenMiddleware]
})
export class SubjectsModule {}
