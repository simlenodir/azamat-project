import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { TokenMiddleware } from 'src/middleware/middleware.service';

@Module({
  controllers: [VideosController],
  providers: [VideosService, TokenMiddleware]
})
export class VideosModule {}
