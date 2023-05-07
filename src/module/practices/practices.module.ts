import { Module } from '@nestjs/common';
import { PracticesService } from './practices.service';
import { PracticesController } from './practices.controller';
import { TokenMiddleware } from 'src/middleware/middleware.service';

@Module({
  controllers: [PracticesController],
  providers: [PracticesService, TokenMiddleware]
})
export class PracticesModule {}
