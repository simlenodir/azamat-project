import { Module } from '@nestjs/common';
import { AdminInfoService } from './admin_info.service';
import { AdminInfoController } from './admin_info.controller';

@Module({
  controllers: [AdminInfoController],
  providers: [AdminInfoService]
})
export class AdminInfoModule {}
