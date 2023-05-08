import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TokenMiddleware } from 'src/middleware/middleware.service';

@Module({
  controllers: [EventsController],
  providers: [EventsService, TokenMiddleware]
})
export class EventsModule {}
