import { Module } from '@nestjs/common';
import { AdminInfoService } from './admin_info.service';
import { AdminInfoController } from './admin_info.controller';
import { TokenMiddleware } from 'src/middleware/middleware.service';

@Module({
  controllers: [AdminInfoController],
  providers: [AdminInfoService, TokenMiddleware]
})
export class AdminInfoModule {}
