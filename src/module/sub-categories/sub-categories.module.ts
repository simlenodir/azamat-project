import { Module } from '@nestjs/common';
import { SubCategoriesService } from './sub-categories.service';
import { SubCategoriesController } from './sub-categories.controller';
import { TokenMiddleware } from 'src/middleware/middleware.service';

@Module({
  controllers: [SubCategoriesController],
  providers: [SubCategoriesService, TokenMiddleware]
})
export class SubCategoriesModule {}
